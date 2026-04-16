export const mockUsers = [
    {
        name: "Koushik Mondal",
        gender: "male",
        username: "koushik_mondal",
        email: "koushik@gmail.com",
        address: {
            street: "Sanghvi",
            suite: "Apt. 6092",
            city: "Pune",
            zipcode: "411217",
            geo: { lat: "18.5204", lng: "73.8567" }
        },
        phone: "9876543210",
        website: "koushik.dev",
        company: {
            name: "Antaris",
            catchPhrase: "Building the future",
            bs: "tech driven solutions"
        },
    },
    {
        name: "Rohit Sharma",
        gender: "male",
        username: "rohit_sharma",
        email: "rohit@gmail.com",
        address: {
            street: "MG Road",
            suite: "Flat 302",
            city: "Mumbai",
            zipcode: "400001",
            geo: { lat: "19.0760", lng: "72.8777" }
        },
        phone: "9000000001",
        website: "rohit.io",
        company: {
            name: "Pixel Labs",
            catchPhrase: "Designing digital dreams",
            bs: "ui ux branding"
        },
    },
    {
        name: "Ananya Singh",
        gender: "female",
        username: "ananya_s",
        email: "ananya@gmail.com",
        address: {
            street: "Civil Lines",
            suite: "Block B",
            city: "Delhi",
            zipcode: "110054",
            geo: { lat: "28.7041", lng: "77.1025" }
        },
        phone: "9000000002",
        website: "ananya.me",
        company: {
            name: "NeoSoft",
            catchPhrase: "Innovating India",
            bs: "software solutions"
        },
    },
    {
        name: "Arjun Patel",
        gender: "male",
        username: "arjun_p",
        email: "arjun@gmail.com",
        address: {
            street: "CG Road",
            suite: "Office 12",
            city: "Ahmedabad",
            zipcode: "380009",
            geo: { lat: "23.0225", lng: "72.5714" }
        },
        phone: "9000000003",
        website: "arjun.dev",
        company: {
            name: "Cloudify",
            catchPhrase: "Scale your future",
            bs: "cloud infrastructure"
        },
    },
    {
        name: "Priha Verma",
        gender: "female",
        username: "riha_v",
        email: "riha@gmail.com",
        address: {
            street: "Park Street",
            suite: "Suite 210",
            city: "Kolkata",
            zipcode: "700016",
            geo: { lat: "22.5726", lng: "88.3639" }
        },
        phone: "9000000004",
        website: "riha.co",
        company: {
            name: "BrandCraft",
            catchPhrase: "We build brands",
            bs: "marketing strategy"
        },
    },
    {
        name: "Aman Gupta",
        gender: "male",
        username: "aman_g",
        email: "aman@gmail.com",
        address: {
            street: "Sector 62",
            suite: "Tower A",
            city: "Noida",
            zipcode: "201309",
            geo: { lat: "28.5355", lng: "77.3910" }
        },
        phone: "9000000005",
        website: "aman.tech",
        company: {
            name: "FinEdge",
            catchPhrase: "Money simplified",
            bs: "fintech services"
        },
    },
    {
        name: "Neha Kapoor",
        gender: "female",
        username: "neha_k",
        email: "neha@gmail.com",
        address: {
            street: "Brigade Road",
            suite: "Level 3",
            city: "Bangalore",
            zipcode: "560025",
            geo: { lat: "12.9716", lng: "77.5946" }
        },
        phone: "9000000006",
        website: "neha.design",
        company: {
            name: "UXHive",
            catchPhrase: "Design that matters",
            bs: "user experience"
        },
    },
    {
        name: "Sahil Mehta",
        gender: "male",
        username: "sahil_m",
        email: "sahil@gmail.com",
        address: {
            street: "Cyber Hub",
            suite: "Unit 8",
            city: "Gurgaon",
            zipcode: "122002",
            geo: { lat: "28.4595", lng: "77.0266" }
        },
        phone: "9000000007",
        website: "sahil.ai",
        company: {
            name: "DataCore",
            catchPhrase: "Data is power",
            bs: "ai analytics"
        },
    },
    {
        name: "Pooja Iyer",
        gender: "female",
        username: "pooja_i",
        email: "pooja@gmail.com",
        address: {
            street: "T Nagar",
            suite: "Flat 5B",
            city: "Chennai",
            zipcode: "600017",
            geo: { lat: "13.0827", lng: "80.2707" }
        },
        phone: "9000000008",
        website: "pooja.in",
        company: {
            name: "EduSpark",
            catchPhrase: "Learning made easy",
            bs: "edtech platform"
        },
    },
    {
        name: "Rahul Nair",
        gender: "male",
        username: "rahul_n",
        email: "rahul@gmail.com",
        address: {
            street: "MG Road",
            suite: "Floor 4",
            city: "Kochi",
            zipcode: "682016",
            geo: { lat: "9.9312", lng: "76.2673" }
        },
        phone: "9000000009",
        website: "rahul.io",
        company: {
            name: "GreenTech",
            catchPhrase: "Sustainable future",
            bs: "clean energy"
        },
    }
].map((user) => {
    fetch(`https://crudcrud.com/api/2edff70db4f5491fa99c84b95d12331f/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
})
