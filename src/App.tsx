import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { ModalLogin, Sidebar, TodoList } from "./shared/components/index";
import { RootState } from "./shared/store/todoStore";
import { addName, allCategory } from "./shared/store/feutures/reservationSlice";

function App() {
  // RootState is typescript thing
  const { name } = useSelector((state: RootState) => {
    return state.reservations;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const date = new Date();
  const day = format(date, "iiii");
  const month = format(date, "MMM");
  const dayNum = format(date, "dd");
  const dispatch = useDispatch();
  const periodFN = () => {
    const tempPeriod = format(date, "a");
    if (tempPeriod === "PM") {
      return "afternoon";
    } else {
      return "morning";
    }
  };
  const period = periodFN();

  useEffect(() => {
    const todoDataLocal = localStorage.getItem("todo-data");
    const todoNameLocal = localStorage.getItem("todo-name");

    if (!todoNameLocal) {
      setIsModalOpen(true);
      dispatch(addName("Human"));
    }
    if (todoNameLocal) {
      dispatch(addName(JSON.parse(todoNameLocal)));

      if (JSON.parse(todoNameLocal) === "Human") {
        setIsModalOpen(true);
      }
    }
    if (todoDataLocal) {
      dispatch(allCategory(JSON.parse(todoDataLocal)));
    }
  }, []);

  return (
    <>
      {isModalOpen && <ModalLogin setIsModalOpen={setIsModalOpen} />}
      <main className="relative flex h-screen w-screen gap-7 bg-[#EAEDEE] p-10">
        <Sidebar />

        <section className="flex h-[90vh] w-full flex-col items-center gap-7 lg:w-[66%]">
          <div className="flex w-full flex-col gap-4 md:w-[100%]">
            <div className="mt-9 flex w-full justify-start">
              <div className="flex gap-5">
                <div className="w-full">
                  <h1 className="w-full text-xl font-normal leading-none text-black md:text-2xl lg:text-3xl">
                    Good {period} {name}
                  </h1>
                  <p className="text-base	font-normal leading-6 text-[#6D6D6D] md:text-base lg:text-2xl">
                    It&apos;s {day}, {month} {dayNum}
                  </p>
                </div>
              </div>
            </div>
            <TodoList />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
