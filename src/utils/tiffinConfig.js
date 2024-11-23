// Configurable tiffin prices
let fullTiffinPrice = 100;
let halfTiffinPrice = 70;

/**
 * Function to calculate cost of a single tiffin based on its type
 * @param {Object} tiffin - The tiffin object containing type and vegetable details
 * @returns {Number} - The cost of the tiffin
 */
export function calculateTiffinCost(tiffin) {
  switch (tiffin.tiffinType) {
    case "full":
      return fullTiffinPrice;
    case "half":
      return halfTiffinPrice;
    case "only-veggie":
      return tiffin.vegetableId?.price || 0;
    default:
      return 0;
  }
}

/**
 * Function to calculate the total cost for all tiffins
 * @param {Array} tiffinsList - List of tiffins to calculate the total cost
 * @returns {Number} - The total cost of all tiffins
 */
export function calculateTotalCost(tiffinsList) {
  const total = tiffinsList.reduce((total, tiffin) => {
    return total + calculateTiffinCost(tiffin);
  }, 0);

  return `₹${total.toFixed(2)}`; // Add rupee symbol and format to 2 decimal places
}

/**
 * Counts the number of unique dates present in the array.
 * @param {Array} data - Array of objects with a date field in ISO string format.
 * @returns {Number} - Count of unique dates in the array.
 */
export function countUniqueDates(data) {
  const uniqueDates = new Set();

  data.forEach((item) => {
    if (item.date) {
      const dateString = new Date(item.date).toISOString().split("T")[0];
      uniqueDates.add(dateString);
    }
  });

  return uniqueDates.size;
}

/**
 * Aggregates tiffin orders by employee and calculates total orders, costs, and order details.
 * @param {Array} orders - Array of order objects, each containing:
 *   @property {Object} employeeId - Object with employee details (`_id` and `name`).
 *   @property {String} tiffinType - Type of tiffin ordered ("full", "half", or "only-veggie").
 *   @property {Object} vegetableId - Object containing details about the vegetable ordered (used for "only-veggie").
 *   @property {String} date - ISO string representing the date of the order.
 * @returns {Array} - Array of objects, where each object summarizes the orders for a specific employee:
 *   @property {String} employeeId - The unique identifier for the employee.
 *   @property {String} name - The name of the employee.
 *   @property {Number} totalOrders - The total number of orders placed by the employee.
 *   @property {Number} totalCost - The total cost of all orders placed by the employee.
 *   @property {Array} orderList - Array of individual order details (`tiffinType`, `vegetableId`, `date`).
 */
export function calculateEmployeeOrders(orders) {
  const FULL_TIFFIN_PRICE = 100;
  const HALF_TIFFIN_PRICE = 70;

  const result = orders.reduce((acc, order) => {
    const { employeeId, tiffinType, vegetableId, date } = order;
    const employeeKey = employeeId._id;

    // Calculate the tiffin price based on tiffinType
    let tiffinPrice = 0;
    if (tiffinType === "full") {
      tiffinPrice = FULL_TIFFIN_PRICE;
    } else if (tiffinType === "half") {
      tiffinPrice = HALF_TIFFIN_PRICE;
    } else if (tiffinType === "only-veggie") {
      tiffinPrice = vegetableId.price;
    }

    // If employee exists in the accumulator, update their record
    if (acc[employeeKey]) {
      acc[employeeKey].totalOrders += 1;
      acc[employeeKey].totalCost += tiffinPrice;
      acc[employeeKey].orderList = [
        ...acc[employeeKey].orderList,
        { tiffinType, vegetableId, date },
      ];
    } else {
      // If employee does not exist, create a new record
      acc[employeeKey] = {
        employeeId: employeeId._id,
        name: employeeId.name,
        totalOrders: 1,
        totalCost: tiffinPrice,
        orderList: [{ tiffinType, vegetableId, date }],
      };
    }

    return acc;
  }, {});

  // Convert the result object back to an array
  return Object.values(result);
}
