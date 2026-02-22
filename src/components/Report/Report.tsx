import { useRef, useEffect } from 'react'
import Chart, { type ChartOptions } from 'chart.js/auto'
import type { ShoppingItem } from "../../types/shopping"
import './Report.scss'

type ReportProps = {
  shoppingData: ShoppingItem[],
  onClose: () => void
}

export default function Report({ shoppingData, onClose }: ReportProps) {
  const chartData = shoppingData.map(item => ({
    name: item.name,
    total: item.qty * item.price
  }))
  
  const totalSpending = chartData.reduce(
    (sum, item) => sum + item.total,
    0
  )
  
  const highestItem = chartData.reduce((max, item) =>
    item.total > max.total ? item : max
  )
  
  const avgCost = totalSpending / shoppingData.length

  return (
    <div className='lp-modal-overlay' onClick={onClose}>
      <div
        className='lp-modal'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='lp-modal-header'>
          <h2>Report</h2>
          <button
            className='lp-modal-close'
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Summary Cards */}
        <div className='lp-summary-grid'>
        <SummaryCard
          title="Total Spending"
          value={`$${totalSpending.toFixed(2)}`}
          footer={`${shoppingData.length} Items in total`}
        />

        <SummaryCard
          title="Highest Cost Item"
          value={`$${highestItem.total.toFixed(2)}`}
          footer={`${highestItem.name} (1 Unit)`}
        />

        <SummaryCard
          title="Average Cost"
          value={`$${avgCost.toFixed(2)}`}
          footer="Per Item"
        />
        </div>

        {/* Chart Section */}
        <div className='lp-chart-section'>
          <h3>Sales Report</h3>

          <div className='lp-chart-placeholder'>
            {/* Chart will be rendered here */}
            <ReportBar chartData={chartData} />
          </div>
        </div>
      </div>
    </div>
  )
}


type SummaryCardProps = {
  title: string
  value: string
  footer: string
}

function SummaryCard({
  title,
  value,
  footer
}: SummaryCardProps) {
  return (
    <div className='lp-summary-card'>
      <div className='lp-summary-title'>{title}</div>
      <div className='lp-summary-value'>{value}</div>
      <div className='lp-summary-footer'>{footer}</div>
    </div>
  )
}

type ReportBarProps = {
  chartData: Array<{ name: string; total: number }>,
}

function ReportBar({ chartData }: ReportBarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const names = chartData.map((d) => d.name)
  const totals = chartData.map((d) => d.total)
  const max = Math.max(...totals)
  const data = {
    labels: names,
    datasets: [
      {
        label: 'Total',
        data: totals,
        backgroundColor: '#93c5fd',   // light blue
        borderRadius: 8,              // rounded bars
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // no legend
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `$${Number(ctx.raw).toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // no vertical grid lines
        },
        ticks: {
          color: '#555',
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: max,
        grid: {
          display: false
        },
        ticks: {
          stepSize: 10,
          callback: (value) => `$${Number(value).toFixed(0)}`,
          color: '#555',
          font: {
            size: 12,
          },
        },
      },
    },
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const chart = new Chart(canvas, {
      type: 'bar',
      data,
      options
    })
    return () => chart.destroy()
  }, [chartData])

  return (
    <div className="lp-report-bar">
      <canvas ref={canvasRef} />
    </div>
  )
}