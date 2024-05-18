import { currentDate } from "../../helpers/currentDate";


type WithLoggingType = {
    logUserAction?: (action: string) => void;
}
export const withLogging = <P extends object>(Component: React.ComponentType<P>) => {
    return (props: P & WithLoggingType) => {
      const logUserAction = (action: string) => {
        console.log(`action: ${currentDate(new Date())}`);
      };
  
      return <Component {...props as P} logUserAction={logUserAction} />;
    };
};