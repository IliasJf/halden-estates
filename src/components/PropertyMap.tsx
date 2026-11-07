import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { Link } from 'react-router-dom'
import type { Property } from '../types'
import { formatCompactPrice, formatPrice } from '../utils/format'
import { imageAt } from '../utils/image'

interface PropertyMapProps {
  homes: Property[]
  /** Slug of the card being hovered or focused in the list; its pin is highlighted. */
  activeSlug: string | null
  /** Reports which homes are inside the visible map area after every pan or zoom. */
  onVisibleChange: (slugs: string[]) => void
  /** Changing this number re-fits the map to all homes (the "Show all" button). */
  fitKey: number
}

const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** A price label as the pin, like on the big property portals. */
function pinIcon(home: Property, active: boolean) {
  return L.divIcon({
    className: '',
    html: `<span class="map-pin${active ? ' is-active' : ''}">${formatCompactPrice(home.price)}</span>`,
    iconSize: undefined,
    iconAnchor: [0, 0],
  })
}

function boundsOf(homes: Property[]) {
  return L.latLngBounds(homes.map((home) => home.coords))
}

/** Fits the map to the homes whenever the result set (or fitKey) changes. */
function FitToHomes({ homes, fitKey }: { homes: Property[]; fitKey: number }) {
  const map = useMap()
  const key = homes.map((home) => home.slug).join()
  useEffect(() => {
    if (homes.length === 0) return
    map.fitBounds(boundsOf(homes), { padding: [48, 48], maxZoom: 14, animate: !reducedMotion })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `key` stands in for `homes`
  }, [map, key, fitKey])
  return null
}

/** Tells the page which homes are in view after the user pans or zooms. */
function ReportVisible({ homes, onVisibleChange }: { homes: Property[]; onVisibleChange: (slugs: string[]) => void }) {
  const report = (map: L.Map) => {
    const view = map.getBounds()
    onVisibleChange(homes.filter((home) => view.contains(home.coords)).map((home) => home.slug))
  }
  const map = useMapEvents({ moveend: () => report(map) })
  // The page passes a fresh array on every render, so compare by content, not identity.
  const key = homes.map((home) => home.slug).join()
  useEffect(() => {
    // Report once on mount and whenever the set of homes changes.
    map.whenReady(() => report(map))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, key])
  return null
}

/** Pins closer than this many pixels on screen are merged into one group pin. */
const CLUSTER_PX = 48

/** Greedy clustering on screen pixels: good enough (and instant) for a few dozen homes. */
function cluster(map: L.Map, homes: Property[]): Property[][] {
  const groups: { point: L.Point; homes: Property[] }[] = []
  for (const home of homes) {
    const point = map.latLngToLayerPoint(home.coords)
    const near = groups.find((group) => group.point.distanceTo(point) < CLUSTER_PX)
    if (near) near.homes.push(home)
    else groups.push({ point, homes: [home] })
  }
  return groups.map((group) => group.homes)
}

function groupIcon(count: number, active: boolean) {
  return L.divIcon({
    className: '',
    html: `<span class="map-pin map-pin--group${active ? ' is-active' : ''}">${count} homes</span>`,
    iconSize: undefined,
    iconAnchor: [0, 0],
  })
}

function Pins({ homes, activeSlug }: { homes: Property[]; activeSlug: string | null }) {
  const markers = useRef(new Map<string, L.Marker>())
  const [zoom, setZoom] = useState<number | null>(null)
  const map = useMapEvents({ zoomend: () => setZoom(map.getZoom()) })
  useEffect(() => {
    map.whenReady(() => setZoom(map.getZoom()))
  }, [map])

  // Recomputed only when the zoom level or the homes change; panning keeps groups as they are.
  const homesKey = homes.map((home) => home.slug).join()
  // eslint-disable-next-line react-hooks/exhaustive-deps -- homesKey stands in for homes
  const groups = useMemo(() => (zoom === null ? [] : cluster(map, homes)), [map, homesKey, zoom])

  // Bring the highlighted pin above its neighbours.
  useEffect(() => {
    markers.current.forEach((marker, slug) => marker.setZIndexOffset(slug === activeSlug ? 1000 : 0))
  }, [activeSlug, groups])

  return groups.map((group) => {
    if (group.length > 1) {
      const key = group.map((home) => home.slug).join()
      const names = group.map((home) => home.title).join(', ')
      return (
        <Marker
          key={key}
          position={boundsOf(group).getCenter()}
          icon={groupIcon(group.length, group.some((home) => home.slug === activeSlug))}
          title={`${group.length} homes: ${names}. Zoom in`}
          alt={`${group.length} homes: ${names}. Zoom in`}
          ref={(marker) => {
            group.forEach((home) => (marker ? markers.current.set(home.slug, marker) : markers.current.delete(home.slug)))
          }}
          eventHandlers={{
            click: () => map.fitBounds(boundsOf(group), { padding: [64, 64], maxZoom: 15, animate: !reducedMotion }),
          }}
        />
      )
    }

    const [home] = group
    return (
      <Marker
        key={home.slug}
        position={home.coords}
        icon={pinIcon(home, home.slug === activeSlug)}
        title={`${home.title}, ${formatPrice(home.price)}`}
        alt={`${home.title}, ${formatPrice(home.price)}`}
        riseOnHover
        ref={(marker) => {
          if (marker) markers.current.set(home.slug, marker)
          else markers.current.delete(home.slug)
        }}
      >
        <Popup closeButton={false} className="map-popup" offset={[0, -38]}>
          <Link to={`/properties/${home.slug}`} className="block w-56 text-ink no-underline">
            <img src={imageAt(home.images[0].src, 480)} alt="" className="aspect-[4/3] w-full rounded-lg object-cover" />
            <span className="mt-2.5 block font-display text-lg leading-snug">{home.title}</span>
            <span className="mt-0.5 block text-sm text-muted">
              {home.neighbourhood}, {home.location}
            </span>
            <span className="mt-1.5 block font-semibold text-pine">
              {formatPrice(home.price)} · {home.beds} beds
            </span>
          </Link>
        </Popup>
      </Marker>
    )
  })
}

export default function PropertyMap({ homes, activeSlug, onVisibleChange, fitKey }: PropertyMapProps) {
  const initialBounds = useMemo(() => boundsOf(homes), []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MapContainer
      bounds={initialBounds}
      boundsOptions={{ padding: [48, 48], maxZoom: 14 }}
      scrollWheelZoom={false}
      // On phones one finger scrolls the page; pinch or the +/- buttons move the map.
      dragging={!L.Browser.mobile}
      zoomAnimation={!reducedMotion}
      className="h-full w-full"
      aria-label="Map of homes for sale"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      <FitToHomes homes={homes} fitKey={fitKey} />
      <ReportVisible homes={homes} onVisibleChange={onVisibleChange} />
      <Pins homes={homes} activeSlug={activeSlug} />
    </MapContainer>
  )
}
