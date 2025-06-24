-- Insert sample data
INSERT INTO education (institution, degree, field_of_study, start_date, end_date, description) VALUES
('Shahjalal University of Science and Technology', 'Bachelor of Science', 'Computer Science and Engineering', '2020-01-01', '2024-06-01', 'Comprehensive study in computer science fundamentals, software engineering, and modern web technologies.');

INSERT INTO skills (name, category, proficiency) VALUES
('JavaScript', 'Programming Languages', 5),
('TypeScript', 'Programming Languages', 4),
('React', 'Frontend Frameworks', 5),
('Next.js', 'Frontend Frameworks', 4),
('Node.js', 'Backend Technologies', 4),
('PostgreSQL', 'Databases', 3),
('Git', 'Tools', 4),
('Tailwind CSS', 'Styling', 5);

INSERT INTO projects (title, description, technologies, github_url, live_url, featured) VALUES
('E-Commerce Platform', 'Full-stack e-commerce solution with payment integration', ARRAY['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'], 'https://github.com/amitkumar/ecommerce', 'https://ecommerce-demo.vercel.app', true),
('Task Management App', 'Collaborative task management tool with real-time updates', ARRAY['React', 'Node.js', 'Socket.io', 'MongoDB'], 'https://github.com/amitkumar/taskmanager', 'https://taskmanager-demo.vercel.app', true);

-- Create default admin user (password: admin123)
-- In production, use a proper password hashing library
INSERT INTO admin_users (email, password_hash) VALUES
('admin@amitkumar.dev', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqQqQqQqQqQqQq');
