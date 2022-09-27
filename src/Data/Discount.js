// CreateDiscountCodeDto{
//   code*	string
//   value*	integer($int32)
//   isPercentage*	boolean
//   isActive*	boolean
//   startDate*	string($date-time)
//   dueDate*	string($date-time)
//   isReusable*	boolean
//   }

export const discountRows = [
	{
		id: 1,
		code: "TF1402",
		value: 30,
		isPercentage: true,
		isActive: true,
		startDate: "01/01/1402",
		dueDate: "01/02/1402",
		isReusable: false,
	},
	{
		id:2,
		code: "TF1403",
		value: 45000,
		isPercentage: false,
		isActive: true,
		startDate: "01/01/1402",
		dueDate: "01/02/1402",
		isReusable: false,
	},
];