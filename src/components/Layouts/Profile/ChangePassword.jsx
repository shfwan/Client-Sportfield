import Button from '@/components/Elements/Button'
import InputForm from '@/components/Elements/Input'
import React from 'react'
import { Key } from 'react-feather'
import ModalLayout from '../ModalLayout'
import FormUbahPassword from '@/components/Fragments/Form/FormUbahPassword'

const ChangePassword = () => {
  return (
    <div>
      <Button className="btn btn-info" onClick={() => document.getElementById("changePassword").showModal()}>
        <Key />Ubah Password</Button>
      <ModalLayout btnX={false} id="changePassword" title="Ubah Password" onClick={() => document.getElementById("changePassword").close()}>
        <FormUbahPassword/>
      </ModalLayout>
    </div>
  )
}

export default ChangePassword