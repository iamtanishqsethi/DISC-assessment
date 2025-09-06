import type {DISCScores} from "@/components/Assessment.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {ChartBar} from "@/components/BarChart.tsx";
import {ChartRadar} from "@/components/RadarChart.tsx";
import {Progress} from "@/components/ui/progress.tsx";
import {RotateCcw, Share} from "lucide-react";
import {HyperText} from "@/components/magicui/hyper-text.tsx";
import {motion} from "framer-motion";

interface ResultProps {
    scores: DISCScores;
    onRetake: () => void;
}

const Result = ({scores, onRetake}: ResultProps) => {
    function getDominantStyle(scores: DISCScores) {
        const traits = {
            D: {
                title: "Driven",
                description: "Direct, assertive, and focused on results.",
                long: "Driven personalities thrive on challenges, competition, and achieving tangible outcomes. They are goal-oriented, decisive, and willing to take risks to push forward. In group settings, they often emerge as natural leaders, though they may sometimes appear impatient or overly forceful. Their focus on efficiency and results makes them highly effective in fast-paced or high-pressure environments."
            },
            I: {
                title: "Influential",
                description: "Outgoing, persuasive, and motivating.",
                long: "Influential personalities excel in communication and relationship-building. They are enthusiastic, energetic, and often inspire others with their optimism. They thrive in social settings, enjoy teamwork, and are motivated by recognition and approval. However, they may sometimes overlook details or struggle with follow-through due to their focus on big-picture ideas and interactions."
            },
            S: {
                title: "Supportive",
                description: "Patient, steady, and cooperative.",
                long: "Supportive personalities value stability, harmony, and collaboration. They are dependable, empathetic, and thrive in roles where patience and consistency are important. They often act as peacemakers in groups, fostering trust and reducing conflict. While they may resist sudden changes or avoid confrontation, their reliability and strong interpersonal skills make them essential for long-term success."
            },
            C: {
                title: "Clarifying",
                description: "Detail-oriented, analytical, and precise.",
                long: "Clarifying personalities prioritize accuracy, logic, and structure. They are thorough thinkers who analyze problems carefully before acting. Their attention to rules, systems, and details ensures quality and minimizes errors. While they can sometimes be perceived as overly cautious or critical, their methodical approach makes them invaluable in tasks that demand precision, planning, and compliance."
            }
        }

        const maxScore = Math.max(scores.D, scores.I, scores.S, scores.C)
        const dominantTraits = Object.entries(scores)
            .filter(([_, value]) => value === maxScore)
            .map(([key]) => key as keyof DISCScores)

        if (dominantTraits.length === 1) {
            const t = dominantTraits[0]
            return traits[t]
        }

        return {
            title: dominantTraits.map((t) => traits[t].title).join(" & "),
            description: dominantTraits.map((t) => traits[t].description).join(" "),
            long: dominantTraits.map((t) => traits[t].long).join(" ")
        }
    }

    const dominantStyle = getDominantStyle(scores)
    return (
        <div className={'flex flex-col items-center justify-center min-h-screen p-4'}>
            <motion.h1
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={'text-3xl md:text-4xl sm:text-xl font-semibold m-2 text-center mt-5'}>
                Your Assessment Results
            </motion.h1>
            <motion.p
                className="text-center text-neutral-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
            >
                Here's how your personality traits stack up.
            </motion.p>

            <motion.div
                className={'flex flex-col items-center justify-center my-4 max-w-3xl text-center px-4'}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
            >
                <HyperText
                    animateOnHover={false}
                    className={'sm:text-2xl text-4xl md:text-6xl  font-semibold m-1.5'}>
                    {dominantStyle.title}
                </HyperText>
                <HyperText
                    animateOnHover={false}
                    className={'text-lg md:text-xl sm:text-sm font-medium'}>
                    {dominantStyle.description}
                </HyperText>
            </motion.div>


            <motion.div
                className={'flex flex-col md:flex-row items-center justify-center gap-4 my-4'}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
            >
                <ChartBar scores={scores}/>
                <ChartRadar scores={scores}/>
            </motion.div>
            <motion.div
                className={'flex flex-col items-center justify-center my-4 max-w-3xl text-center px-4'}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                viewport={{ once: true }}
            >
                <p className="mt-4 text-base md:text-lg sm:text-xs leading-relaxed text-neutral-300">
                    {dominantStyle.long}
                </p>
            </motion.div>

            <motion.div
                className="flex justify-center items-center my-4 w-full md:w-[700px]"
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
            >
                <Table className="w-full">
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
            </motion.div>
            <motion.div
                className={'flex flex-col sm:flex-row items-center justify-center gap-4'}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
            >
                <Button onClick={onRetake} className={'m-4 cursor-pointer'}>
                    <RotateCcw className="mr-2"/> Retake Assessment
                </Button>
                <Button className={'m-4 cursor-pointer'}>
                    <Share className="mr-2"/> Share Results
                </Button>
            </motion.div>
        </div>
    )
}
export default Result