export function returnPointInPercent(data) {
    let point = 0;
    data.map((item, i) => {
        point += parseInt(item.point);
        return point;
    });
    point = point / data.length;
    return Math.round(point * 10);
}