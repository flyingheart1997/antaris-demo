import type { PhysicalMetric, PhysicalMetricSource } from "../types/catalog"

export function getPhysicalMetrics(
  sources: PhysicalMetricSource[]
): PhysicalMetric[] {
  return sources.map((source) => ({
    key: source.key,
    icon: source.icon,
    value: source.value ?? source.fallbackValue ?? "0",
    max: source.max,
    progress: getProgress(source.value, source.maxValue),
  }))
}

function getProgress(value: string | undefined, max: number) {
  if (!value) return 0

  const match = value.match(/(\d+(\.\d+)?)/)
  if (!match) return 0

  const numeric = Number.parseFloat(match[1])
  if (!Number.isFinite(numeric) || max <= 0) return 0

  return Math.min(Math.max(numeric / max, 0), 1)
}
