import Button from '@/components/Elements/Button'
import InputForm from '@/components/Elements/Input'
import React from 'react'
import { Key } from 'react-feather'

const ChangePassword = () => {
  return (
    <div>
      <Button className="btn btn-info" onClick={() => document.getElementById("changePassword").showModal()}>
        <Key />Ubah Password</Button>
      <dialog id="changePassword" className='modal'>
        <div className='modal-box bg-white'>
          <InputForm
            name="password"
            title="Password Baru"
            placeholder="Masukkan Password Baru"
            type="password"
            label="PasswordBaru"
          />
          <InputForm
            name="confirmPassword"
            title="Konfirmasi Password Baru"
            placeholder="Konfirmasi Password Baru"
            type="password"
            label="KonfirmasiPasswordBaru"
          />
          <div className='flex justify-end mr-3 mt-3 gap-x-3'>
            <Button className="btn btn-error" onClick={() => document.getElementById("changePassword").close()}>Batal</Button>
            <Button className="btn btn-info" onClick={() => document.getElementById("changePassword").close()}>Simpan</Button>
          </div>
        </div>

      </dialog>
    </div>
  )
}

export default ChangePassword