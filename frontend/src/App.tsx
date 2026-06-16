import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import TeachersPage from './pages/teachers/TeachersPage'
import AddTeacherPage from './pages/teachers/AddTeacherPage'
import ClassesPage from './pages/classes/ClassesPage'
import AddClassPage from './pages/classes/AddClassPage'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/teachers/add" element={<AddTeacherPage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/classes/add" element={<AddClassPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}