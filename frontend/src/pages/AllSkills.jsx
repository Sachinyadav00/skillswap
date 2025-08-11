// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axiosInstance from "../utils/axiosInstance";
// import toast from "react-hot-toast";
// import { Bookmark, Send, Info } from "lucide-react";
// import { useNavigate } from "react-router";

// const AllSkills = () => {
//   const navigate = useNavigate();
//   const [skills, setSkills] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         const res = await axiosInstance.get("/api/v1/skills/Allskills");
//         setSkills(res.data.skills || []);
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Failed to fetch skills");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSkills();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-40">
//         <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (!skills.length) {
//     return (
//       <p className="text-center text-gray-600 text-lg font-medium">
//         No skills available.
//       </p>
//     );
//   }

//   const handleGetDetails = (id) => {

//     console.log("Navigating with skill id:", id);
//     navigate(`skilldetail/${id}`);

//   };

//   return (
//     <section className="p-4 sm:p-6 lg:p-10">
//       <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-10 text-center bg-gradient-to-r from-blue-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
//         Explore All Skills
//       </h2>

//       <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {skills.map((skill, index) => (
//           <motion.article
//             key={skill._id || index}
//             className="flex flex-col bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/30 hover:shadow-2xl transition-all duration-300"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{
//               delay: index * 0.05,
//               type: "spring",
//               stiffness: 80,
//               damping: 18,
//             }}
//           >
//             {/* Image */}
//             <div className="relative w-full aspect-[4/3] sm:aspect-[16/10]">
//               <img
//                 src={skill.thumbnail}
//                 alt={skill.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//               <div className="absolute bottom-3 left-4">
//                 <h3 className="text-lg sm:text-xl font-semibold text-white drop-shadow-md">
//                   {skill.title}
//                 </h3>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="flex-1 p-5 flex flex-col justify-between">
//               <div>
//                 <p className="text-sm text-gray-700 mb-4 line-clamp-3">
//                   {skill.description}
//                 </p>

//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {skill.category && (
//                     <span className="badge-blue">{skill.category}</span>
//                   )}
//                   {skill.experienceLevel && (
//                     <span className="badge-green">{skill.experienceLevel}</span>
//                   )}
//                   {skill.mode && (
//                     <span className="badge-purple">{skill.mode}</span>
//                   )}
//                 </div>

//                 <ul className="text-xs text-gray-500 space-y-1">
//                   <li>👤 {skill.createdBy?.username || "Unknown Creator"}</li>
//                   <li>📍 {skill.location || "N/A"}</li>
//                   <li>
//                     ⏰ {skill.availableTimes?.join(", ") || "Not specified"}
//                   </li>
//                 </ul>
//               </div>

//               {/* Buttons */}
//               <div className="mt-5 space-y-2">
//                 <button
//                   onClick={() => handleGetDetails(skill._id)}
//                   className="btn-primary w-full"
//                 >
//                   <Info size={16} /> Get All Details
//                 </button>
//                 <div className="flex flex-col sm:flex-row gap-2">
//                   <button className="btn-outline-green flex-1">
//                     <Send size={16} /> Apply
//                   </button>
//                   <button className="btn-outline-blue flex-1">
//                     <Bookmark size={16} /> Save
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.article>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default AllSkills;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { Bookmark, Send, Info } from "lucide-react";
import { useNavigate } from "react-router";

const AllSkills = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/skills/Allskills");
        setSkills(res.data.skills || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch skills");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!skills.length) {
    return (
      <p className="text-center text-gray-600 text-lg font-medium">
        No skills available.
      </p>
    );
  }

  const handleGetDetails = (id) => {
    console.log("Navigating with skill id:", id);
    navigate(`/skilldetail/${id}`); // <-- make sure this has a leading /
  };

  return (
    <section className="p-4 sm:p-6 lg:p-10">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-10 text-center bg-gradient-to-r from-blue-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
        Explore All Skills
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {skills.map((skill, index) => (
          <motion.article
            key={skill._id || index}
            className="flex flex-col bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/30 hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.05,
              type: "spring",
              stiffness: 80,
              damping: 18,
            }}
          >
            {/* Image */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10]">
              <img
                src={skill.thumbnail}
                alt={skill.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white drop-shadow-md">
                  {skill.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                  {skill.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {skill.category && (
                    <span className="badge-blue">{skill.category}</span>
                  )}
                  {skill.experienceLevel && (
                    <span className="badge-green">{skill.experienceLevel}</span>
                  )}
                  {skill.mode && (
                    <span className="badge-purple">{skill.mode}</span>
                  )}
                </div>

                <ul className="text-xs text-gray-500 space-y-1">
                  <li>👤 {skill.createdBy?.username || "Unknown Creator"}</li>
                  <li>📍 {skill.location || "N/A"}</li>
                  <li>
                    ⏰ {skill.availableTimes?.join(", ") || "Not specified"}
                  </li>
                </ul>
              </div>

              {/* Buttons */}
              <div className="mt-5 space-y-2">
                <button
                  onClick={() => handleGetDetails(skill._id)}
                  className="btn-primary w-full"
                >
                  <Info size={16} /> Get All Details
                </button>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="btn-outline-green flex-1">
                    <Send size={16} /> Apply
                  </button>
                  <button className="btn-outline-blue flex-1">
                    <Bookmark size={16} /> Save
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default AllSkills;
