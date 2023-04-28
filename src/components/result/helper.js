export const getResult = (records = []) => {
	const result = records.reduce((acc, curr) => {
		const [employeeId, projectId, ...rest] = curr;

		if (!acc[projectId]) {
			acc[projectId] = {
				overlapDays: 0,
				id1: 0,
				id2: 0,
				data: [],
			};
		}

		acc[projectId].data.forEach((el) => {
			const overlapDays = calcDays(el[2], el[3], curr[2], curr[3]);

			if (overlapDays > acc[projectId].overlapDays) {
				acc[projectId].overlapDays = overlapDays;
				acc[projectId].id1 = el[0];
				acc[projectId].id2 = curr[0];
			}
		});

		acc[projectId].data.push(curr);

		return acc;
	}, {});

	const entries = Object.entries(result);
	const sorted = entries
		.sort((a, b) => {
			return b[1].overlapDays - a[1].overlapDays;
		})
		.map((el) => {
			const projectId = el[0];
			const id1 = el[1].id1;
			const id2 = el[1].id2;
			const overlapDays = el[1].overlapDays;

			return { projectId, id1, id2, overlapDays };
		});

	return sorted;
};

function calcDays(startDateEmp1, endDateEmp1, startDateEmp2, endDateEmp2) {
	const startDate1 = new Date(startDateEmp1);
	const endDate1 =
		endDateEmp1 === null
			? new Date()
			: endDateEmp1 === 'NULL'
			? new Date()
			: endDateEmp1 === 'null'
			? new Date()
			: new Date(endDateEmp1);
	const startDate2 = new Date(startDateEmp2);
	const endDate2 =
		endDateEmp2 === null
			? new Date()
			: endDateEmp2 === 'NULL'
			? new Date()
			: endDateEmp2 === 'null'
			? new Date()
			: new Date(endDateEmp2);

	const start = startDate1 < startDate2 ? startDate2 : startDate1;
	const end = endDate1 < endDate2 ? endDate1 : endDate2;

	if (end > start) {
		const timeDiff = Math.abs(end - start);
		const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
		return days;
	}

	return 0;
}
