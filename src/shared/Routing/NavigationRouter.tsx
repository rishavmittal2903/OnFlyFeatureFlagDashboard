import { Routes, Route } from 'react-router-dom';
import FeatureFlag from '../../components/organism/FeatureFlags/FeatureFlag';
import FeatureFlagsEnvironments from '../../components/organism/FeatureFlagsEnvironments/FeatureFlagsEnvironments';
import Home from '../../components/organism/Home/Home';
import LoginRegisteration from "../../components/organism/LoginRegisterationComponent/LoginRegisterationComponent";
import Organization from '../../components/organism/Organization/Organization';
import Products from '../../components/organism/Products/Products';
import ProtectedRoute from './ProtectedRoute';

const NavigationRouter=()=>{

    return (
        <Routes>
        <Route path='/' element={<LoginRegisteration/>} />
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path='/organization' element={<ProtectedRoute><Organization/></ProtectedRoute>}/>
        <Route path='/projects' element={<ProtectedRoute><Products/></ProtectedRoute>}/>
        <Route path='/projects/:projectId' element={<ProtectedRoute><Products/></ProtectedRoute>}/>
        <Route path='/featureFlag' element={<ProtectedRoute><FeatureFlag/></ProtectedRoute>}/>
        <Route path='/featureFlag/environments' element={<ProtectedRoute><FeatureFlagsEnvironments/></ProtectedRoute>}/>
        <Route path='/featureFlag/sdk' element={<ProtectedRoute><FeatureFlagsEnvironments/></ProtectedRoute>}/>

      </Routes>
    )
}


export default NavigationRouter;