import { useState, useEffect } from 'react';
import { userService } from '../services/userService';

export const useUsers = (filters = {}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getUsers(filters);
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters.search, filters.role, filters.status]);

  return { users, loading, refetch: fetchUsers };
};

export default useUsers;
