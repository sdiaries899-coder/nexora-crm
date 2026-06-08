import Card from "../../components/ui/Card";

const Stats = ({ stats }) => {
  if (!stats) return null;

  const items = [
    { label: "Users", value: stats.totalUsers },
    { label: "Cards", value: stats.totalCards },
    { label: "Companies", value: stats.totalCompanies },
    { label: "Comments", value: stats.totalComments },
    { label: "Stages", value: stats.totalStages },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {items.map((item, index) => (
        <Card key={index}>
          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm">{item.label}</p>
            <p className="text-2xl font-semibold">{item.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Stats;