import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({comment, fetchComments}) => {

    const {blog, createdAt, _id}  = comment;
    const BlogDate = new Date(createdAt);

    const {axios} = useAppContext();

    const approveComment = async () => {
        try {
            const {data} = await axios.post('/api/admin/approve-comment', {id: _id})
            if(data.success){
                toast.success(data.message)
                fetchComments()
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const deleteComment = async () => {
        try {
            const confirm = window.confirm('Are you sure want to delete this comment?')
            if(!confirm) return;

            const {data} = await axios.post('/api/admin/delete-comment', {id: _id})
            if(data.success){
                toast.success(data.message)
                fetchComments()
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <tr className='border-y border-gray-300'>
        <td className='px-6 py-4'>
            <b className='font-medium text-gray-600'>Blog</b> : {comment.blog.title} <br />
            <br />
            <b className='font-medium text-gray-600'>Name</b> : {comment.name} <br />
            <b className='font-medium text-gray-600'>comment</b> : {comment.content} <br />
        </td>

        <td className='px-6 py-4 max-sm:hidden'>
            {BlogDate.toLocaleDateString()}
        </td>

        <td className='px-6 py-4'>
            <div className='inline-flex items-center gap-4'>
            {
            !comment.isApproved ?
            <img onClick={approveComment} src={assets.tick_icon} className='w-5 hover:scale-110 transition-all cursor-pointer'/> :
            <p className='text-xs border border-green-600 bg-green-100 text-green-600 px-3
            rounded py-1'>
                Approved</p>
                }
            <img onClick={deleteComment} src={assets.bin_icon} className='w-5 hover:scale-110 transition-all
            cursor-pointer' />
            </div>
        </td>
    </tr>
  )
}

export default CommentTableItem