import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('/api/supplier');
                setSuppliers(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Supplier List</h2>
            <ul>
                {suppliers.map(supplier => (
                    <li key={supplier.id}>{supplier.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SupplierList;