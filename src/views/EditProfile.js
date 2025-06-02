import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../context/AuthContext";

function EditProfile() {
  const { user, updateUserProfile, authTokens } = useContext(AuthContext);

  const { register, handleSubmit, watch, reset } = useForm();
  const imageFile = watch("image");
  const [editing, setEditing] = useState(false);

  // Reset form when user data changes
  useEffect(() => {
    if (user) {
      reset({
        full_name: user.full_name || "",
        bio: user.bio || "",
      });
    }
  }, [user, reset]);

  // 🔁 Auto refresh every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (user) {
        reset({
          full_name: user.full_name || "",
          bio: user.bio || "",
        });
      }
    }, 20000);

    return () => clearInterval(interval); // Cleanup
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("full_name", data.full_name);
      formData.append("bio", data.bio);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await updateUserProfile(user.user_id, formData);
      alert("Profile updated successfully");
      setEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="container mt-20" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Edit Your Profile</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border p-4 rounded bg-light"
      >
        <div className="mb-3">
          <label htmlFor="full_name" className="form-label fw-bold">
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            className="form-control"
            {...register("full_name", { required: true })}
            disabled={!editing}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="bio" className="form-label fw-bold">
            Bio
          </label>
          <textarea
            id="bio"
            rows="3"
            className="form-control"
            {...register("bio")}
            disabled={!editing}
          />
        </div>

        <div className="mb-4">
          <h5 className="mb-2">Profile Image</h5>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            {...register("image")}
            disabled={!editing}
          />
          <small className="text-muted mt-2 d-block">
            {imageFile?.[0]?.name || "No file chosen"}
          </small>
        </div>

        {editing ? (
          <>
            <button
              type="submit"
              className="btn btn-success w-100 fw-bold"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary w-100 mt-2"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-primary w-100 fw-bold"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </form>
    </div>
  );
}

export default EditProfile;