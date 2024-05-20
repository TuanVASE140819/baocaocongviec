import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import CheckboxFive from "../../components/Checkboxes/CheckboxFive";
import CheckboxFour from "../../components/Checkboxes/CheckboxFour";
import CheckboxOne from "../../components/Checkboxes/CheckboxOne";
import CheckboxThree from "../../components/Checkboxes/CheckboxThree";
import CheckboxTwo from "../../components/Checkboxes/CheckboxTwo";
import SwitcherFour from "../../components/Switchers/SwitcherFour";
import SwitcherOne from "../../components/Switchers/SwitcherOne";
import SwitcherThree from "../../components/Switchers/SwitcherThree";
import SwitcherTwo from "../../components/Switchers/SwitcherTwo";
import DefaultLayout from "../../layout/DefaultLayout";
import DatePickerOne from "../../components/Forms/DatePicker/DatePickerOne";
import DatePickerTwo from "../../components/Forms/DatePicker/DatePickerTwo";
import SelectGroupTwo from "../../components/Forms/SelectGroup/SelectGroupTwo";
import MultiSelect from "../../components/Forms/MultiSelect";
import { Package } from "../../types/package";
import flatpickr from "flatpickr";
import {
  query,
  where,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "../../components/firebase"; // Import your Firestore instance from the correct file path
import { useEffect, useState } from "react";
import moment from "moment";
import { get } from "firebase/database";
import PDFTable from "../../components/PDF/PDFTable";
type DataType = {
  // Define the shape of the data here. For example:
  date: string;
  name: string;
  now: string;
  tomorrow: string;
  // Add more fields as necessary
};

const FormElements = () => {
  const [name, setName] = useState("");

  const [date, setDate] = useState(moment().format("DD/MM/YYYY"));
  const [data, setData] = useState<Package[]>([]);
const [allData, setAllData] = useState<Package[]>([]);

console.log('date', date);
useEffect(() => {
  // Init flatpickr
  flatpickr('.form-datepicker', {
    mode: 'single',
    static: true,
    monthSelectorType: 'static',
    dateFormat: 'M j, Y',
    onChange: function (selectedDates, dateStr, instance) {
      setDate(moment(selectedDates[0]).format('DD/MM/YYYY'));
    },
    prevArrow:
      '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
    nextArrow:
      '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
  });
}, []);

const createData = async (data: DataType) => {
  await addDoc(collection(db, 'Reports'), data);
};

// Update function
const updateData = async (id: string, data: DataType) => {
  const docRef = doc(db, 'Reports', id);
  await updateDoc(docRef, data);
};

// Delete function
const deleteData = async (id: string) => {
  const docRef = doc(db, 'Reports', id);
  await deleteDoc(docRef);
};
// console local storage. email

console.log('name', name);
console.log('date', date);
const getData = async () => {
  const email = localStorage.getItem('user');
  if (email) {
    const querySnapshot = await getDocs(
      query(
        collection(db, 'Reports'),
        where('name', '==', name),
        where('date', '==', date),
      ),
    );
    let data: Package[] = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      data.push(doc.data() as Package);
    });
    setData(data);
  }
};

const getAllData = async () => {
  const querySnapshot = await getDocs(collection(db, 'Reports'));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
    setAllData((prev) => [...prev, doc.data() as Package]);
  });
};

console.log('allData', allData);
useEffect(() => {
  getData();
}, [name, date]);

console.log('data', data);

useEffect(() => {
  const user = localStorage.getItem('user');
  if (user) {
    let userObj = JSON.parse(user);
    setName(userObj.email || '');
  }
}, []);

const handleSubmit = async (event: any) => {
  event.preventDefault();
  const data: DataType = {
    date: date,
    name: name,
    now: event.target[0].value,
    tomorrow: event.target[1].value,
  };
  await createData(data);
};

  // window.location.href = "/pdf-table";

  const handlePrint = () => {
    window.location.href = "/pdf-table";
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Báo cáo công việc" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        {/* / button có svg máy in */}
        <div className="flex justify-end">
  <button className="flex items-center gap-2 text-primary font-medium text-base bg-white border border-primary rounded-lg px-5 py-3 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-300 ease-in-out"
  onClick={handlePrint}
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 5H5V15H15V5ZM15 3C16.1046 3 17 3.89543 17 5V15C17 16.1046 16.1046 17 15 17H5C3.89543 17 3 16.1046 3 15V5C3 3.89543 3.89543 3 5 3H15Z"
        fill="#64748B"
      />
      <path
        d="M7 3H13V5H7V3ZM7 15H13V17H7V15ZM7 7H13V9H7V7ZM7 11H13V13H7V11Z"
        fill="#64748B"
      />
    </svg>
    IN BÁO CÁO
  </button>
</div>
        <div className="flex flex-col gap-9">
          {/* <!-- Textarea Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Ngày báo cáo
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <div className="relative">
                  <input
                    className="form-datepicker w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="mm/dd/yyyy"
                    data-class="flatpickr-right"
                    value={date}
                   
                  />
                  <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                        fill="#64748B"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Thông tin công việc
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Báo cáo công việc hôm nay
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Báo cáo công việc hôm nay"
                    value={data[0]?.now as string}
                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition-all duration-500 ease-in-out focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                  ></textarea>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Báo cáo công việc ngày mai
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Báo cáo công việc ngày mai"
                    value={data[0]?.tomorrow as string}
                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-40 h-12 rounded-lg text-white font-medium text-base mt-10 ml-auto bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* <PDFTabledata ={data} /> */}

    </DefaultLayout>
  );
};

export default FormElements;
