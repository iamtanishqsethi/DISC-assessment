import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import type { DISCScores } from "@/components/Assessment.tsx"

// config for bar chart
const chartConfig = {
    score: {
        label: "Score",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChartBar({ scores }: { scores: DISCScores }) {
    const chartData = [
        { type: "Drive", score: scores.D },
        { type: "Influence", score: scores.I },
        { type: "Support", score: scores.S },
        { type: "Clarity", score: scores.C },
    ]

    return (
        <Card className="h-64 md:h-80 w-[300px] md:w-[400px]">
            <CardHeader>
                <CardTitle>Trait Scores</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="type"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="score" fill="var(--chart-1)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
