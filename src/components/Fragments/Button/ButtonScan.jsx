import React, { useEffect, useState } from 'react'
import ModalLayout from '../../Layouts/ModalLayout'
import FormKonfirmasi from '../Form/FormKonfirmasi'
import QrScanner from 'qr-scanner'
import { IoScan } from 'react-icons/io5'
import CryptoJS from 'crypto-js'

const ButtonScan = () => {
    let isStopScan = false
    const [isScan, setScan] = useState(true)
    const [isResult, setIsResult] = useState(false)
    const [confirm, setConfirm] = useState(null)

    const scanQr = async (isScanNow) => {

        setScan(isScanNow)
        if (isScanNow) isStopScan = true

        if (isScan === false) return;
        isStopScan = false

        await new Promise((r) => setTimeout(r, 100));
        const scanner = new QrScanner(
            document.getElementById('scanView'),
            (result) => {                
                setIsResult(true)
                setConfirm(CryptoJS.AES.decrypt(result.data, process.env.NEXT_PUBLIC_KEY).toString(CryptoJS.enc.Utf8))
                scanner.stop()
                scanner.destroy()
            },
            {
                onDecodeError: (error) => {
                    console.error(error);
                },
                maxScansPerSecond: 1,
                highlightScanRegion: true,
                highlightCodeOutline: true,
                returnDetailedScanResult: true,
            },
        );

        scanner.start();

        while (isStopScan === false) await new Promise((r) => setTimeout(r, 100));

        scanner.stop()
        scanner.destroy()

    }

    const handleBtnScan = () => {
        document.getElementById("scanQrCode").showModal()
        scanQr(!isScan)
    }

    const handleStop = () => {
        document.getElementById("scanQrCode").close()
        scanQr(!isScan)
        setIsResult(false)
    }
    

    return (
        <>
            <span className="bg-success p-4 rounded-full w-fit h-fit cursor-pointer hover:scale-105 transition-all" onClick={handleBtnScan}><IoScan color='white' size={36} /></span>
            <ModalLayout title="Scan QR Code" id="scanQrCode" onClick={handleStop}>
                {
                    isResult ? <FormKonfirmasi data={JSON.parse(confirm)} onClick={handleStop} /> : <video id="scanView" className='w-full h-full max-w-7xl object-cover'></video>
                }
            </ModalLayout>
        </>
    )
}

export default ButtonScan