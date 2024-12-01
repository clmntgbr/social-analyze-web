import { generateMonthlyStats } from "@/components/GenerateMonthlyStats";
import { Analysis } from "@/store/client/interface/analysis";
import { Insight } from "@/store/client/interface/insight";
import { Activity, Heart, MessageCircleMore, Share, UserRoundCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";
import LinkedinInsightChart from "./InsightChart";
import LinkedinInsightChartMultiple from "./InsightChartMultiple";
import LinkedinInsightPanel from "./InsightPanel";

interface Props {
  analysis: Analysis;
  insights: Insight[];
}

export default function LinkedinInsight({ analysis, insights }: Props) {
  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    setChartData(generateMonthlyStats(analysis?.socialAccount?.posts ?? []));
  }, [analysis?.socialAccount?.posts]);

  const transformData = (inputData: Insight[], primaryKey: keyof Insight, secondaryKey: keyof Insight) => {
    const data = inputData.map((item) => ({
      month: item.label.replace(" 2024", ""),
      primary: item[primaryKey],
      secondary: item[secondaryKey],
    }));
    return data;
  };

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
          title="Taux d'engagement"
          value={analysis?.socialAccount?.engagementRate?.toString() ?? "~"}
          type="%"
          hasTooltip={true}
          icon={Activity}
          iconColor="text-green-500"
          tooltipText={`Based on last ${analysis?.socialAccount?.postCount} publications`}
        />
        <LinkedinInsightChart title="Publications per month" label="Linkedin" data={chartData} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        <LinkedinInsightChartMultiple
          title="Publications per month / likes"
          labelPrimary="Publications"
          labelSecondary="Likes"
          hasTooltip={true}
          tooltipText="Based on last six months"
          data={transformData(insights, "posts", "likes")}
        />
        <LinkedinInsightChartMultiple
          title="Publications per month / comments"
          labelPrimary="Publications"
          labelSecondary="Comments"
          tooltipText="Based on last six months"
          hasTooltip={true}
          data={transformData(insights, "posts", "comments")}
        />
        <LinkedinInsightChartMultiple
          title="Publications per month / reposts"
          labelPrimary="Publications"
          labelSecondary="Reposts"
          tooltipText="Based on last six months"
          hasTooltip={true}
          data={transformData(insights, "posts", "reposts")}
        />
        <LinkedinInsightChartMultiple
          title="Publications per month / engagement rate"
          labelPrimary="Publications"
          labelSecondary="Rate"
          tooltipText="Based on last six months"
          hasTooltip={true}
          data={transformData(insights, "posts", "engagementRate")}
        />
      </div>
    </>
  );
}
