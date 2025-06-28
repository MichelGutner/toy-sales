export const fakeCreateClientApi = async (data: {
  name: string;
  email: string;
  birthDate: string;
}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.name && data.email && data.birthDate) {
        resolve({ success: true, message: "Client created successfully" });
      } else {
        reject(new Error("All fields are required"));
      }
    }, 1000);
  });
};
