import { toast } from "react-toastify";
import { get } from "./api";

export async function fetchLookupData(
  endpoint,
  firstValue,
  propertyName,
  setOptions = {}
) {
  try {
    const res = await get(endpoint, setOptions);
    if (res.status.isSuccess) {
      const options = [
        firstValue,
        ...res.data[propertyName].map((item) => ({
          value: item.id,
          label: item.name,
        })),
      ];
      return options;
    } else {
      toast.error(res.status.message || "Something Went Wrong");
    }
  } catch (error) {
    toast.error(`Error fetching data: ${error.message}`);
  }
}
