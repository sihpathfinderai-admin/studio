import { Suspense } from "react";
import { AiAdvisorClient } from "./ai-advisor-client";

export default function AiAdvisorPage() {
    return (
        <Suspense>
            <AiAdvisorClient />
        </Suspense>
    );
}
