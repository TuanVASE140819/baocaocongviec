import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import TableTwo from '../components/Tables/TableTwo';
import DefaultLayout from '../layout/DefaultLayout';


import { collection, getDocs } from 'firebase/firestore';
import { db } from '../components/firebase';
import { useEffect, useState } from 'react';


type DataType = {
  // Define the shape of the data here. For example:
  field1: string;
  field2: number;
  // Add more fields as necessary
};
const Tables = () => {
  const [data, setData] = useState<DataType[]>([]); // Use DataType[] as the type for useState
  
  useEffect(() => {
    const fetchData = async () => {
      const dataCollection = collection(db, 'Users'); // Replace 'Users' with the name of your collection
      const dataSnapshot = await getDocs(dataCollection);
      const dataList = dataSnapshot.docs.map((doc) => doc.data());
      setData(dataList as DataType[]); // Cast dataList as DataType[]
    };

    fetchData();
  }, []);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        {/* <TableOne />
        <TableTwo /> */}
        <TableThree data={data} />
      </div>
    </DefaultLayout>
  );
};

export default Tables;
