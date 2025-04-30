
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <motion.form 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSearch} 
      className={`w-full ${isMobile ? 'max-w-full' : 'max-w-2xl'} mx-auto`}
    >
      <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
        <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${isFocused ? 'text-eduGreen' : 'text-spotifyLightGray'}`}>
          <Search size={isMobile ? 16 : 20} />
        </div>
        <Input
          type="text"
          placeholder={isMobile ? "Rechercher..." : "Rechercher un cours, une matière, un niveau..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`pl-10 pr-4 py-3 bg-black/30 border-gray-700 text-white rounded-full transition-all duration-300 hover:bg-black/40 focus:ring-2 focus:ring-offset-0 ${isFocused ? 'border-eduGreen ring-eduGreen/30 shadow-lg shadow-eduGreen/10' : 'border-gray-700'}`}
        />
        {searchTerm && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-eduGreen text-black p-1.5 rounded-full hover:bg-eduGreen/90 transition-colors"
          >
            <Search size={isMobile ? 14 : 16} />
          </motion.button>
        )}
      </div>
    </motion.form>
  );
};

export default SearchBar;
