import axios from 'axios'

export const imgUpload = async (files) => {
    const formData = new FormData()
    formData.append('file', files)
    formData.append('upload_preset', 'jag6ma0t')
    
    const { data } = await axios.post('https://api.cloudinary.com/v1_1/dqdoxrm2x/image/upload', formData, {withCredentials: false})
    const url = data?.secure_url
    return url
}