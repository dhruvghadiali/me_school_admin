import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

const ChartContext = React.createContext(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

const ChartContainer = React.forwardRef(
  (
    {
      id,
      className,
      children,
      config,
      ...props
    },
    ref
  ) => {
    const uniqueId = React.useMemo(() => id || `chart-${Math.random()}`, [id])
    const chartConfig = React.useMemo(() => {
      return config || {}
    }, [config])

    return (
      <ChartContext.Provider value={{ id: uniqueId, config: chartConfig }}>
        <div
          ref={ref}
          className={cn(
            "flex aspect-auto justify-center text-xs h-80",
            className
          )}
          {...props}
        >
          <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    )
  }
)
ChartContainer.displayName = "ChartContainer"

const ChartStyle = ({ id, config }) => {
  return null
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef(
  ({ active, payload, label, indicator = "line", hideLabel = false }, ref) => {
    if (active && payload && payload.length) {
      return (
        <div
          ref={ref}
          className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-950 p-2 shadow-md"
        >
          {!hideLabel && <p className="text-xs font-medium text-slate-900 dark:text-white">{label}</p>}
          <div className="space-y-1">
            {payload.map((item, index) => (
              <div key={index} className="text-xs">
                <span style={{ color: item.color }} className="font-medium">
                  {item.name}:
                </span>
                <span className="text-slate-600 dark:text-slate-300 ml-1">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

export {
  ChartContainer,
  ChartStyle,
  ChartContext,
  useChart,
  ChartTooltip,
  ChartTooltipContent,
  RechartsPrimitive,
}
