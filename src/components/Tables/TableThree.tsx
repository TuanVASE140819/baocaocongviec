import { Package } from '../../types/package';

type DataType = {
  // Define the shape of the data here. For example:
  lastName: string;
  role: string;
  status: string;
  // Add more fields as necessary
};
const TableThree = ({ data }: {
  data: Package[
  
] }) => { 
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                STT
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Nhân viên
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Role
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((packageItem, key) => (
              <tr
                className={`${
                  key === data.length - 1
                    ? ''
                    : 'border-b border-stroke dark:border-strokedark'
                }`}
                key={key}
              >
                <td className="py-4 px-4 xl:pl-11">
                  <p className="text-black dark:text-white">{key + 1}</p>
                </td>
                <td className="py-4 px-4 xl:pl-11">
                  <div className="flex items-center">
                    <p className="text-black dark:text-white ml-3">
                      {packageItem?.lastName}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span 
                    className={`${
                      packageItem.role === 'user'
                        ? 'bg-green-100 text-green-500'
                        : packageItem.role === "admin"
                        ? 'bg-red-100 text-red-500'
                        : 'bg-yellow-100 text-yellow-500'
                      } py-1 px-3 rounded-full text-xs font-medium`}
                  >
                    {packageItem.role}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`${
                      packageItem.status === 'active'
                        ? 'bg-green-100 text-green-500'
                        : packageItem.status === 'unactive'
                        ? 'bg-red-100 text-red-500'
                        : 'bg-yellow-100 text-yellow-500'
                    } py-1 px-3 rounded-full text-xs font-medium`}
                  >
                    {packageItem.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-primary-600 hover:text-primary-700">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
