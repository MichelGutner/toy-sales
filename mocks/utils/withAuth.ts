// mock/utils/withAuth.ts
export const withAuth = <TArgs extends any[], TResult>(
  func: (...args: TArgs) => TResult | Promise<TResult>
) => {
  return async (
    token: string | undefined,
    ...args: TArgs
  ): Promise<TResult> => {
    if (token !== "fake-token") {
      throw { status: 401, message: "Unauthorized" };
    }
    return await fn(...args);
  };
};