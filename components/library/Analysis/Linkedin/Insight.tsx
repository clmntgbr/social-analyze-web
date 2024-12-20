import { generateMonthlyStats } from "@/components/GenerateMonthlyStats";
import { Analysis } from "@/store/client/interface/analysis";
import { GetAnalysisInsights } from "@/store/client/interface/GetAnalysisInsights";
import { Activity, Heart, MessageCircleMore, Share, UserRoundCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";
import ChartComponent from "../../ChartComponent";
import LinkedinInsightPanel from "./InsightPanel";

interface Props {
  analysis: Analysis;
  insights: GetAnalysisInsights | null;
}

export default function LinkedinInsight({ analysis, insights }: Props) {
  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    setChartData(generateMonthlyStats(analysis?.socialAccount?.posts ?? []));
  }, [analysis?.socialAccount?.posts]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <LinkedinInsightPanel
          title="Followers"
          value={analysis?.socialAccount?.followerCount?.toString() ?? "~"}
          icon={Users}
          iconColor="text-pink-500"
        />
        <LinkedinInsightPanel
          title="Followings"
          value={analysis?.socialAccount?.followingCount?.toString() ?? "~"}
          icon={UserRoundCheck}
          iconColor="text-orange-500"
        />
        <LinkedinInsightPanel
          title="Likes"
          value={analysis?.socialAccount?.likeCount?.toString() ?? "~"}
          icon={Heart}
          hasTooltip={true}
          iconColor="text-red-600"
          tooltipText={`Based on last ${analysis?.socialAccount?.postCount} publications`}
        />
        <LinkedinInsightPanel
          title="Comments"
          value={analysis?.socialAccount?.commentCount?.toString() ?? "~"}
          icon={MessageCircleMore}
          iconColor="text-yellow-500"
          hasTooltip={true}
          tooltipText={`Based on last ${analysis?.socialAccount?.postCount} publications`}
        />
        <LinkedinInsightPanel
          title="Reposts"
          value={analysis?.socialAccount?.shareCount?.toString() ?? "~"}
          icon={Share}
          iconColor="text-blue-500"
          hasTooltip={true}
          tooltipText={`Based on last ${analysis?.socialAccount?.postCount} publications`}
        />
        <LinkedinInsightPanel
          title="Engagement rate"
          value={analysis?.socialAccount?.engagementRate?.toString() ?? "~"}
          type="%"
          hasTooltip={true}
          icon={Activity}
          iconColor="text-green-500"
          tooltipText={`Based on last ${analysis?.socialAccount?.postCount} publications`}
        />
        <ChartComponent
          title="Publications per month"
          label="Linkedin"
          data={chartData}
          hasTooltip={false}
          className="rounded-xl border bg-card text-card-foreground shadow h-full 
            lg:row-span-2 lg:col-start-4 lg:row-start-1 md:col-span-2"
        />
        <LinkedinInsightPanel
          title="Average likes per publications"
          value={insights?.averageLikes.toString() ?? "~"}
          icon={Heart}
          hasTooltip={true}
          iconColor="text-red-600"
          tooltipText={`Based on last ${analysis?.socialAccount?.postCount} publications`}
        />
        <LinkedinInsightPanel
          title="Average comments per publications"
          value={insights?.averageComments.toString() ?? "~"}
          icon={MessageCircleMore}
          hasTooltip={true}
          iconColor="text-yellow-500"
          tooltipText={`Based on last ${analysis?.socialAccount?.postCount} publications`}
        />
        <LinkedinInsightPanel
          title="Average reposts per publications"
          value={insights?.averageReposts.toString() ?? "~"}
          icon={Share}
          hasTooltip={true}
          iconColor="text-blue-500"
          tooltipText={`Based on last ${analysis?.socialAccount?.postCount} publications`}
        />
      </div>
    </>
  );
}
