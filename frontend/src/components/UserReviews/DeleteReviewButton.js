import { useDispatch } from 'react-redux'
import * as reviewsActions from '../../store/reviews';

export default function DeleteReviewButton({ reviewId }) {
    const dispatch = useDispatch();
    const handleDeleteClick = async () => {
        try {
            await dispatch(reviewsActions.deleteReview(reviewId))
        }

        catch (res) {
            const data = await res.json();
            if (data.message) return alert(data.message);
        }
    }

    return (
        <button onClick={handleDeleteClick} id="button--delete-review">Delete Review</button>
    )
}
