import "./statistics.css";
import { PieChart, Pie, Cell } from "recharts";

function Statistics() {
  const data1 = [
		{ name: "Not Done", value: 600 },
		{ name: "Done", value: 300 },
	];
  const color1 = ["#37CAFE", "#EFC621"];

  const data2 = [
		{ name: "Not Done", value: 200 },
		{ name: "Done", value: 700 },
	];
  const color2 = ["#37CAFE", "#F5AC2E"];
  
  const data3 = [
		{ name: "Not Done", value: 600 },
		{ name: "Done", value: 100 },
	];
	const color3 = ["#37CAFE", "#3787FE"];
  
  return (
		<div className="statistics">
			<div className="statisticsContainer">
				<div className="chartContainer">
					<PieChart width={300} height={300}>
						<Pie
							data={data1}
							innerRadius={60}
							outerRadius={100}
							fill="#8884d8"
							paddingAngle={5}
							dataKey="value"
						>
							{data1.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={color1[index % color1.length]}
								/>
							))}
						</Pie>
					</PieChart>
					<div className="chartName bold">اعـضای آنـلایـن سامانه سایپورت</div>
				</div>
				<div className="chartContainer">
					<PieChart width={300} height={300}>
						<Pie
							data={data2}
							innerRadius={60}
							outerRadius={100}
							fill="#8884d8"
							paddingAngle={5}
							dataKey="value"
						>
							{data2.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={color2[index % color2.length]}
								/>
							))}
						</Pie>
					</PieChart>
					<div className="chartName bold">آزمـونهـای درحال اجرا</div>
				</div>
				<div className="chartContainer">
					<PieChart width={300} height={300}>
						<Pie
							data={data3}
							innerRadius={60}
							outerRadius={100}
							fill="#8884d8"
							paddingAngle={5}
							dataKey="value"
						>
							{data3.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={color3[index % color3.length]}
								/>
							))}
						</Pie>
					</PieChart>
					<div className="chartName bold">آزمونهای اجرا شده</div>
				</div>
			</div>
		</div>
	);
}

export default Statistics;
