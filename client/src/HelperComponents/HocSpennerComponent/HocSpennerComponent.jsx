import SpennerComponent from '../SpennerComponent/SpennerComponent';

const HOCSpenner = function (OriginalComponent) {
   const newComponent = function ({ isLaoding, ...otherProps }) {
      return isLaoding ? <SpennerComponent /> : <OriginalComponent {...otherProps} />;
   };

   return newComponent;
};

export default HOCSpenner;
