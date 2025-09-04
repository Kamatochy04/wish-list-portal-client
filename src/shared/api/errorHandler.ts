export const createErrorHandler = (action: string) => (error: any) => {
  console.error(`Error in ${action}:`, error);
};
