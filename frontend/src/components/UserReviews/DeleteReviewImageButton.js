import { useDispatch } from 'react-redux'
import * as reviewsActions from '../../store/reviews';

export default function DeleteReviewImageButton({ reviewId, reviewImgId }) {
    const dispatch = useDispatch();
    const handleDeleteClick = async () => {
        try {
            await dispatch(reviewsActions.deleteReviewImg(reviewId, reviewImgId))
        }

        catch (res) {
            const data = await res.json();
            if (data) return alert(data.message);
        }
    }

    return (
        <button onClick={handleDeleteClick} id="button--delete-review-img">Delete Image</button>
    )
}
