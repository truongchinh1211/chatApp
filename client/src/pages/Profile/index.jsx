import { useEffect, useRef, useState } from "react";
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import { storage } from "../../store/firebase/firebase";
import Avatar from "../../components/Avatar";
import { useGetUserQuery, useSetAvatarMutation, useUpdateUserMutation } from "../../store/redux/api/userApi";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";


function ProfilePage() {
    const [isEdit, setIsEdit] = useState(false)
    const [errors, setErrors] = useState({})
    const [selectedGender,setSelectedGender] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("")
    const [isLoading,setIsLoading] = useState(false)

    const {data} = useGetUserQuery()
    const [updateUserMutation] = useUpdateUserMutation()
    const [setAvatar] = useSetAvatarMutation()

    // const passwordInput = useRef()
    const nameInput = useRef()
    const dobInput = useRef()

    useEffect(() => {
        if (data) {
            setSelectedGender(data.gender)
            setAvatarUrl(data.profilePic)
        }
      }, [data])

    let createdDate=''
    let defaultDob=''
    if(data){
        defaultDob = new Date(data.dob).toISOString().slice(0, 10)
        const date = new Date(data.createdAt)
        createdDate = date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
    }
    const validateDob= () => {
        const dobValue = dobInput.current.value
        const today = new Date()
        const selectedDate = new Date(dobValue)
        if (isNaN(selectedDate.getTime()) || dobValue === '' || selectedDate > today) {
            setErrors((prev) => ({ ...prev, dob: 'Ngày sinh không hợp lệ (không được sau hôm nay)' }));
        } else {
            setErrors((prev) => ({ ...prev, dob: undefined })); // Xóa lỗi nếu hợp lệ
        }
    }
    const validateName = () => {
        const value = nameInput.current.value
            setErrors((prev) => 
                ({ ...prev, name:(!value || value.length < 3)?
                     "Name must be at least 3 characters"
                     :null }));
    };
    const validateGender = (e)=>{
        setErrors((prev) => ({ ...prev, gender:(e.target.value==='')?"Gender must be selected!":null }))
        setSelectedGender(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(selectedGender==='')
            setErrors((prev) => ({ ...prev,gender:"Gender must be selected!"}))
        if (!errors.name && !errors.dob && !errors.gender) {
            let name = nameInput.current.value
            let gender = selectedGender
            let dob = dobInput.current.value
            let data = {
                name,
                gender,
                dob
            }
            console.log(data)
            updateUserMutation(data).unwrap()
            .then(()=>{
                toast.success("Update successful!")
                setIsEdit(false)
            })
            .catch((er)=>toast.error(er.data))
        } 
    }

    const handleFormCancelled=(e)=>{
        e.preventDefault()
        setErrors({})
        setIsEdit(false)
    }

    const handleFileChange = async(e) => {
        const file = e.target.files[0]
        if (file) {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif']
            if (!validImageTypes.includes(file.type)) {
                toast.error('wrong file type(JPEG, PNG, GIF)!!!')
                return;
            } else {
                const email = data.email
                const fileName = `avatar_${email}`
                const storageRef = ref(storage, `avt/${fileName}`)
                setIsLoading(true)
                try{
                    await uploadBytes(storageRef, file)
                    const downloadURL = await getDownloadURL(storageRef)
                    await setAvatar({profilePic:downloadURL})
                    toast.success('upload avatar successful!', downloadURL)
                    setAvatarUrl(downloadURL)
                    e.target.value = null
                }catch(er){
                    toast.error('error occurs: ', er)
                    console.log(er)
                }finally {
                    setIsLoading(false)
                }
            }
        }
    }

    return ( 
    <>
    {(!data || isLoading) && <Loading />}
    <div className="flex justify-center items-center md:mx-5 w-full max-md:bg-white">
        <div className="flex flex-wrap w-full md:gap-y-3">
                <div className="md:w-1/3 w-full md:px-4">
                    <div className="flex flex-col justify-between h-full bg-white shadow-lg py-10 px-8">
                    <div className="flex flex-col items-center justify-between h-full">    
                        <Avatar
                            avatar={avatarUrl}
                            alt="Avatar" 
                            className="h-[100px] w-[100px] lg:size-[200px]" 
                        />
                        <div>
                        <div>
                            <input
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="avatar-upload"
                                className="mt-4 text-blue-500 font-semibold hover:underline hover:text-blue-600 transition duration-300 cursor-pointer"
                            >
                                Set Avatar
                            </label>
                        </div>
                        </div>
                        <h1 className="lg:leading-10 font-semibold lg-text-lg"> {data?'Hello '+data.name:'Loading!!'} !!</h1>
                        <h1 className="leading-10 md:text-sm">{createdDate?'Created day: '+createdDate:'' }</h1>
                    </div>
                        <button onClick={()=>setIsEdit(true)} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Edit profile
                        </button>
                    </div>
                </div>
                <div className="md:w-[1px] max-md:h-[1px] w-full bg-gray-300"></div>
                {/* Form */}
                <div className="md:-ms-1 flex flex-col md:w-2/3 w-full md:px-4 h-auto ">
                    <div className="md:shadow-lg bg-white py-5 px-10 h-full">
                        {isEdit ? (
                        <form className="py-10" onSubmit={handleSubmit}>
                        <h1 className="text-center font-bold text-2xl uppercase">Profile details</h1>
                    
                        {/* Name field */}
                        <div className="mb-4">
                            <label htmlFor="firstName" className="mb-2 font-semibold">Name</label>
                            <input
                                ref={nameInput}
                                placeholder={data?.name}
                                type="text"
                                id="firstName"
                                className="border border-gray-300 p-2 rounded w-full"
                                onBlur={validateName}
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                    
                        {/* Gender field */}
                        <div className="mb-4">
                            <label htmlFor="gender" className="mb-2 font-semibold">Gender</label>
                            <select
                                id="gender"
                                className="border border-gray-300 p-2 rounded w-full"
                                onChange={validateGender}
                                value={selectedGender}
                            >
                                <option name="gender" value="">Select gender</option>
                                <option name="gender" value="male">Male</option>
                                <option name="gender" value="female">Female</option>
                                <option name="gender" value="other">Other</option>
                            </select>
                            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                        </div>
                    
                        {/* Date of Birth field */}
                        <div className="mb-4">
                            <label htmlFor="dob" className="mb-2 font-semibold">Date of Birth</label>
                            <input
                                ref={dobInput}
                                defaultValue={defaultDob?defaultDob:''}
                                type="date"
                                id="dob"
                                className="border border-gray-300 p-2 rounded w-full"
                                onBlur={validateDob}
                                required
                            />
                            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                        </div>
                    
                        {/* Password change */}
                        <div className="mb-4 flex flex-row gap-x-3">
                            <label htmlFor="password" className="mb-2 font-semibold">Password:</label>
                            <div className="underline text-blue-700">change</div>
                        </div>
                    
                        {/* Submit and Cancel buttons */}
                        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Submit
                        </button>
                        <button onClick={handleFormCancelled} className="ms-3 mt-4 text-blue-500 border border-blue-500 py-2 px-4 rounded hover:bg-blue-600">
                            Cancel
                        </button>
                    </form>
                        ):(
                        <div>
                            <h1 className="text-center font-bold text-2xl uppercase mb-4 md:py-10">Profile details</h1>
                            <div className="mb-4 flex">
                                <p className="font-semibold w-1/3">Name:</p>
                                <p className="w-2/3">{data?data.name:'Loading!!'}</p>
                            </div>
                            <div className="mb-4 flex">
                                <p className="font-semibold w-1/3">Email:</p>
                                <p className="w-2/3">{data?data.email:'Loading!!'}</p>
                            </div>
                            <div className="mb-4 flex">
                                <p className="font-semibold w-1/3">Password:</p>
                                <p className="w-2/3">********</p>
                            </div>
                            <div className="mb-4 flex">
                                <p className="font-semibold w-1/3">Gender:</p>
                                <p className="w-2/3">{data ? data.gender : 'Loading!!'}</p>
                            </div>
                            <div className="mb-4 flex">
                                <p className="font-semibold w-1/3">Date of Birth:</p>
                                <p className="w-2/3">{data ? new Date(data.dob).toLocaleDateString('en-GB') : 'Loading!!'}</p>
                            </div>
                        </div>
                        ) }
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default ProfilePage;