import AppRoutes from "./routes/AppRoutes";//used to keep all routes align and project organized way
import { Toaster } from "react-hot-toast";//used to give notification like "login successful" etc 
//this below define function with arrow function syntax that open return bloock that define what should be display on the screen
//Why it's there: React rules dictate that a component can only return one single outer parent element.
//  If you don't want to pollute your web page with an extra, useless <div> tag just to group elements, 
// you wrap them in this empty fragment <>.
//The line below is  it is a JSX code comment ({/* ... */}).
//the AppRountes is component decide the which page like login register will display on screen base on user corrent url
const App = () => {
  return (
    <>
      {/* Toast Notifications */}
      <Toaster />

      {/* Routes */}
      <AppRoutes />
    </>
  );
};

export default App;