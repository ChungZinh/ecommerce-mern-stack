export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);

  const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;

  return formattedDate;
};

export const formatCreatedAt = (dataString: string) => {
  const date = new Date(dataString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
