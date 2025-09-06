import type {DISCScores} from "@/components/Assessment.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {ChartBar} from "@/components/BarChart.tsx";
import {ChartRadar} from "@/components/RadarChart.tsx";
import {Progress} from "@/components/ui/progress.tsx";

interface ResultProps {
    scores: DISCScores;
    onRetake: () => void;
}

const Result = ({scores,onRetake}:ResultProps) => {
    function getDominantStyle(scores: DISCScores) {
        const titles={
            D: "Driven",
            I: "Influential",
            S: "Supportive",
            C: "Clarifying",
        }

        const descriptions = {
            D: "Direct, assertive, and focused on results.",
            I: "Outgoing, persuasive, and motivating.",
            S: "Patient, steady, and cooperative.",
            C: "Detail-oriented, analytical, and precise.",
        }

        const maxScore = Math.max(scores.D, scores.I, scores.S, scores.C)
        const dominantTraits = Object.entries(scores)
            .filter(([_, value]) => value === maxScore)
            .map(([key]) => key as keyof DISCScores)

        if (dominantTraits.length === 1) {
            const t = dominantTraits[0]

            return { title: titles[t], description: descriptions[t] }
        }

        return {
            title: dominantTraits.map((t) => titles[t]).join(" & "),
            description: dominantTraits.map((t) => descriptions[t]).join(" "),
        }
    }
    const dominantStyle = getDominantStyle(scores)
    return(
        <div className={'flex flex-col items-center justify-center min-h-screen'}>
            <h1 className={'text-4xl font-semibold m-5'}>Your DISC Assessment Results</h1>
            <p>Here’s how your personality traits stack up.</p>
            <div className={'flex items-center justify-center gap-4 my-4'}>
                <ChartBar scores={scores}/>
                <ChartRadar scores={scores}/>
            </div>
            <div className={'flex flex-col items-center justify-center my-4'}>
                <h1 className={'text-3xl font-semibold m-1.5'}>
                    Your Dominant Style : {dominantStyle.title}
                </h1>
                <p className={'text-lg font-medium '}>
                    {dominantStyle.description}
                </p>
            </div>



            <div className="flex justify-center items-center my-4">
                <Table className="w-[600px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead >Type</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Progress</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Drive</TableCell>
                            <TableCell>{scores.D}</TableCell>
                            <TableCell><Progress value={scores.D*10} /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Influence</TableCell>
                            <TableCell>{scores.I}</TableCell>
                            <TableCell><Progress value={scores.I*10}/></TableCell>

                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Support</TableCell>
                            <TableCell>{scores.S}</TableCell>
                            <TableCell><Progress value={scores.S*10}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Clarity</TableCell>
                            <TableCell>{scores.C}</TableCell>
                            <TableCell><Progress value={scores.C*10}/></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <Button onClick={onRetake} className={'m-4'}>
                Retake Assessment ?
            </Button>
        </div>
    )
}
export default Result