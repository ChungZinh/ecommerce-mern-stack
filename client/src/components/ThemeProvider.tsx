import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useSelector((state: RootState) => state.theme.value); // Ensure you access the correct value

  
  //  dark:bg-[rgb(16,23,42)]
  return (
    <div className={theme}>
      <div className="bg-[#F8F9FA] text-gray-700 dark:bg-[rgb(16,23,42)]  dark:text-gray-200 min-h-screen">
        {children}
      </div>
    </div>
  );
}
