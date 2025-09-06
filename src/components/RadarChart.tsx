import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
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

// config for radar chart
const chartConfig = {
    score: {
        label: "Score",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function ChartRadar({ scores }: { scores: DISCScores }) {
    const chartData = [
        { type: "Drive", score: scores.D },
        { type: "Influence", score: scores.I },
        { type: "Support", score: scores.S },
        { type: "Clarity", score: scores.C },
    ]

    return (
        <Card className="h-80 w-[400px]">
            <CardHeader className="items-center">
                <CardTitle>Personality Balance</CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto  max-h-[250px]"
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarGrid gridType="circle" />
                        <PolarAngleAxis dataKey="type" />
                        <Radar
                            dataKey="score"
                            fill="var(--chart-2)"
                            fillOpacity={0.6}
                            dot={{ r: 4, fillOpacity: 1 }}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
