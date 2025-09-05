import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";

const paperLinks = {
    2024: {
        "AE": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/AE.pdf",
        "AG": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/AG.pdf",
        "AR": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/AR.pdf",
        "BM": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/BM.pdf",
        "BT": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/BT.pdf",
        "CE": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/CE1.pdf",
        "CH": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/CH.pdf",
        "CS": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/CS1.pdf",
        "CY": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/CY.pdf",
        "DA": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/DA.pdf",
        "EC": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/EC.pdf",
        "EE": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/EE.pdf",
        "ES": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/ES.pdf",
        "EY": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/EY.pdf",
        "GE": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/GE.pdf",
        "GG": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/GG.pdf",
        "IN": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/IN.pdf",
        "MA": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/MA.pdf",
        "ME": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/ME1.pdf",
        "MN": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/MN.pdf",
        "MT": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/MT.pdf",
        "NM": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/NM.pdf",
        "PE": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/PE.pdf",
        "PH": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/PH.pdf",
        "PI": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/PI.pdf",
        "ST": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/ST.pdf",
        "TF": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/TF.pdf",
        "XE": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/XE.pdf",
        "XH": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/XH.pdf",
        "XL": "https://gate2024.iisc.ac.in/wp-content/uploads/2024/02/XL.pdf"
    },
    2023: {
        "AE": "https://gate.iitk.ac.in/GATE2023/papers/AE.pdf",
        "AG": "https://gate.iitk.ac.in/GATE2023/papers/AG.pdf",
        "AR": "https://gate.iitk.ac.in/GATE2023/papers/AR.pdf",
        "BM": "https://gate.iitk.ac.in/GATE2023/papers/BM.pdf",
        "BT": "https://gate.iitk.ac.in/GATE2023/papers/BT.pdf",
        "CE": "https://gate.iitk.ac.in/GATE2023/papers/CE1.pdf",
        "CH": "https://gate.iitk.ac.in/GATE2023/papers/CH.pdf",
        "CS": "https://gate.iitk.ac.in/GATE2023/papers/CS.pdf",
        "CY": "https://gate.iitk.ac.in/GATE2023/papers/CY.pdf",
        "EC": "https://gate.iitk.ac.in/GATE2023/papers/EC.pdf",
        "EE": "https://gate.iitk.ac.in/GATE2023/papers/EE.pdf",
        "ES": "https://gate.iitk.ac.in/GATE2023/papers/ES.pdf",
        "EY": "https://gate.iitk.ac.in/GATE2023/papers/EY.pdf",
        "GE": "https://gate.iitk.ac.in/GATE2023/papers/GE.pdf",
        "GG": "https://gate.iitk.ac.in/GATE2023/papers/GG.pdf",
        "IN": "https://gate.iitk.ac.in/GATE2023/papers/IN.pdf",
        "MA": "https://gate.iitk.ac.in/GATE2023/papers/MA.pdf",
        "ME": "https://gate.iitk.ac.in/GATE2023/papers/ME1.pdf",
        "MN": "https://gate.iitk.ac.in/GATE2023/papers/MN.pdf",
        "MT": "https://gate.iitk.ac.in/GATE2023/papers/MT.pdf",
        "NM": "https://gate.iitk.ac.in/GATE2023/papers/NM.pdf",
        "PE": "https://gate.iitk.ac.in/GATE2023/papers/PE.pdf",
        "PH": "https://gate.iitk.ac.in/GATE2023/papers/PH.pdf",
        "PI": "https://gate.iitk.ac.in/GATE2023/papers/PI.pdf",
        "ST": "https://gate.iitk.ac.in/GATE2023/papers/ST.pdf",
        "TF": "https://gate.iitk.ac.in/GATE2023/papers/TF.pdf",
        "XE": "https://gate.iitk.ac.in/GATE2023/papers/XE.pdf",
        "XH": "https://gate.iitk.ac.in/GATE2023/papers/XH.pdf",
        "XL": "https://gate.iitk.ac.in/GATE2023/papers/XL.pdf",
        "DA": "#" // Not available for 2023
    },
    2022: {
        "AE": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/AE_GATE_2022.pdf",
        "AG": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/AG_GATE_2022.pdf",
        "AR": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/AR_GATE_2022.pdf",
        "BM": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/BM_GATE_2022.pdf",
        "BT": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/BT_GATE_2022.pdf",
        "CE": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/CE_GATE_2022.pdf",
        "CH": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/CH_GATE_2022.pdf",
        "CS": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/CS_GATE_2022.pdf",
        "CY": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/CY_GATE_2022.pdf",
        "EC": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/EC_GATE_2022.pdf",
        "EE": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/EE_GATE_2022.pdf",
        "ES": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/ES_GATE_2022.pdf",
        "EY": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/EY_GATE_2022.pdf",
        "GE": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/GE_GATE_2022.pdf",
        "GG": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/GG_GATE_2022.pdf",
        "IN": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/IN_GATE_2022.pdf",
        "MA": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/MA_GATE_2022.pdf",
        "ME": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/ME_GATE_2022.pdf",
        "MN": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/MN_GATE_2022.pdf",
        "MT": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/MT_GATE_2022.pdf",
        "NM": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/NM_GATE_2022.pdf",
        "PE": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/PE_GATE_2022.pdf",
        "PH": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/PH_GATE_2022.pdf",
        "PI": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/PI_GATE_2022.pdf",
        "ST": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/ST_GATE_2022.pdf",
        "TF": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/TF_GATE_2022.pdf",
        "XE": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/XE_GATE_2022.pdf",
        "XH": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/XH_GATE_2022.pdf",
        "XL": "https://gate.iitkgp.ac.in/wp-content/uploads/2022/02/XL_GATE_2022.pdf",
        "DA": "#" // Not available for 2022
    },
    2021: {
        "AE": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/AE.pdf",
        "AG": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/AG.pdf",
        "AR": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/AR.pdf",
        "BM": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/BM.pdf",
        "BT": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/BT.pdf",
        "CE": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/CE1.pdf",
        "CH": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/CH.pdf",
        "CS": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/CS1.pdf",
        "CY": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/CY.pdf",
        "EC": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/EC.pdf",
        "EE": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/EE.pdf",
        "ES": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/ES.pdf",
        "EY": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/EY.pdf",
        "GG": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/GG.pdf",
        "IN": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/IN.pdf",
        "MA": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/MA.pdf",
        "ME": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/ME1.pdf",
        "MN": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/MN.pdf",
        "MT": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/MT.pdf",
        "PE": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/PE.pdf",
        "PH": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/PH.pdf",
        "PI": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/PI.pdf",
        "ST": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/ST.pdf",
        "TF": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/TF.pdf",
        "XE": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/XE.pdf",
        "XH": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/XH.pdf",
        "XL": "https://gate2021.iitb.ac.in/wp-content/uploads/2021/03/XL.pdf",
        "DA": "#", // Not available for 2021
        "GE": "#", // Not available for 2021
        "NM": "#" // Not available for 2021
    },
};

const streams = [
    { name: "Aerospace Engineering", code: "AE" },
    { name: "Agricultural Engineering", code: "AG" },
    { name: "Architecture and Planning", code: "AR" },
    { name: "Biomedical Engineering", code: "BM" },
    { name: "Biotechnology", code: "BT" },
    { name: "Civil Engineering", code: "CE" },
    { name: "Chemical Engineering", code: "CH" },
    { name: "Computer Science and IT", code: "CS" },
    { name: "Chemistry", code: "CY" },
    { name: "Data Science and AI", code: "DA" },
    { name: "Electronics and Communication Engineering", code: "EC" },
    { name: "Electrical Engineering", code: "EE" },
    { name: "Environmental Science and Engineering", code: "ES" },
    { name: "Ecology and Evolution", code: "EY" },
    { name: "Geomatics Engineering", code: "GE" },
    { name: "Geology and Geophysics", code: "GG" },
    { name: "Instrumentation Engineering", code: "IN" },
    { name: "Mathematics", code: "MA" },
    { name: "Mechanical Engineering", code: "ME" },
    { name: "Mining Engineering", code: "MN" },
    { name: "Metallurgical Engineering", code: "MT" },
    { name: "Naval Architecture and Marine Engineering", code: "NM" },
    { name: "Petroleum Engineering", code: "PE" },
    { name: "Physics", code: "PH" },
    { name: "Production and Industrial Engineering", code: "PI" },
    { name: "Statistics", code: "ST" },
    { name: "Textile Engineering and Fibre Science", code: "TF" },
    { name: "Engineering Sciences", code: "XE" },
    { name: "Humanities and Social Sciences", code: "XH" },
    { name: "Life Sciences", code: "XL" },
];

const years = [2024, 2023, 2022, 2021];

export default function PapersPage() {
    return (
        <div className="container mx-auto max-w-7xl py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl font-headline">
                    Previous Year Papers
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-muted-foreground">
                    Access official question papers to sharpen your preparation.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {streams.map((stream) => (
                    <Card key={stream.name} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-headline">
                                <FileText className="h-6 w-6 text-accent" />
                                {stream.name}
                            </CardTitle>
                            <CardDescription>Download papers from recent years.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {years.map((year) => {
                                const url = (paperLinks as any)[year]?.[stream.code] || "#";
                                const isEnabled = url !== "#";
                                return (
                                    <Button asChild variant="outline" className="w-full justify-between" key={year} disabled={!isEnabled}>
                                        <a href={url} download={`GATE-${year}-${stream.name.replace(/\s+/g, '-')}-Paper.pdf`} target="_blank" rel="noopener noreferrer">
                                            GATE {year} Question Paper
                                            <Download className="h-4 w-4" />
                                        </a>
                                    </Button>
                                );
                            })}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
