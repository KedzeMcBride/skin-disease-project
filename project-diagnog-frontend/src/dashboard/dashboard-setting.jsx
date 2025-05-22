
import { useState } from 'react';
import { Mail, Shield, Bell, Key, Globe, Sun, Moon } from 'lucide-react';

const DashboardSetting = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [privacy, setPrivacy] = useState(true);
    const [language, setLanguage] = useState('English');

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleNotifications = () => {
        setNotifications(!notifications);
    };

    const togglePrivacy = () => {
        setPrivacy(!privacy);
    };

    return (
        <>
            <style>{`
                .dashboard-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 32px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .title-section {
                    margin-bottom: 32px;
                }

                .main-title {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #263043;
                    border-bottom: 3px solid #3b82f6;
                    padding-bottom: 8px;
                    margin: 0;
                }

                .settings-container {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .setting-section {
                    background-color: #f9fafb;
                    padding: 20px;
                    border-radius: 8px;
                    border: 1px solid #e5e7eb;
                }

                .section-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 16px;
                }

                .section-icon {
                    margin-right: 12px;
                }

                .section-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #374151;
                    margin: 0;
                }

                .section-content {
                    margin-left: 36px;
                }

                /* Email Settings */
                .email-input {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #d1d5db;
                    border-radius: 6px;
                    font-size: 14px;
                    margin-bottom: 12px;
                    outline: none;
                }

                .email-input:focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }

                .update-btn {
                    padding: 8px 16px;
                    background-color: #3b82f6;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: background-color 0.2s;
                }

                .update-btn:hover {
                    background-color: #2563eb;
                }

                /* Services */
                .services-list {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .service-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px;
                    background: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 6px;
                }

                .service-status {
                    padding: 4px 12px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 500;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                .status-active {
                    background-color: #10b981;
                    color: white;
                }

                .status-active:hover {
                    background-color: #059669;
                }

                .status-inactive {
                    background-color: #6b7280;
                    color: white;
                }

                .status-inactive:hover {
                    background-color: #4b5563;
                }

                /* Toggle Switches */
                .toggle-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 16px;
                }

                .toggle-container:last-child {
                    margin-bottom: 0;
                }

                .toggle-label {
                    color: #4b5563;
                    font-size: 14px;
                }

                .toggle-switch {
                    position: relative;
                    display: inline-block;
                    width: 44px;
                    height: 24px;
                }

                .toggle-input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .toggle-slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #d1d5db;
                    border-radius: 12px;
                    transition: 0.4s;
                }

                .toggle-slider:before {
                    position: absolute;
                    content: "";
                    height: 18px;
                    width: 18px;
                    left: 3px;
                    bottom: 3px;
                    background-color: white;
                    border-radius: 50%;
                    transition: 0.4s;
                }

                .toggle-input:checked + .toggle-slider {
                    background-color: #3b82f6;
                }

                .toggle-input:checked + .toggle-slider:before {
                    transform: translateX(20px);
                }

                /* Privacy specific toggle */
                .privacy-toggle .toggle-input:checked + .toggle-slider {
                    background-color: #ef4444;
                }

                /* Theme specific toggle */
                .theme-toggle .toggle-input:checked + .toggle-slider {
                    background-color: #8b5cf6;
                }

                /* Notification specific toggle */
                .notification-toggle .toggle-input:checked + .toggle-slider {
                    background-color: #6366f1;
                }

                /* Password Management */
                .password-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .password-btn {
                    width: 100%;
                    padding: 12px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    text-align: left;
                    transition: background-color 0.2s;
                }

                .btn-orange {
                    background-color: #f97316;
                    color: white;
                }

                .btn-orange:hover {
                    background-color: #ea580c;
                }

                .btn-gray {
                    background-color: #6b7280;
                    color: white;
                }

                .btn-gray:hover {
                    background-color: #4b5563;
                }

                .btn-red {
                    background-color: #ef4444;
                    color: white;
                }

                .btn-red:hover {
                    background-color: #dc2626;
                }

                /* Language Selection */
                .language-select {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #d1d5db;
                    border-radius: 6px;
                    font-size: 14px;
                    background-color: white;
                    outline: none;
                }

                .language-select:focus {
                    border-color: #14b8a6;
                    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
                }

                /* Save Button */
                .save-button {
                    width: 200px;
                    padding: 16px;
                    background-color: #2563eb;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 16px;
                    transition: background-color 0.2s;
                }

                .save-button:hover {
                    background-color: #1d4ed8;
                }

                /* Setup Button */
                .setup-btn {
                    padding: 4px 12px;
                    background-color: #3b82f6;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 12px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                .setup-btn:hover {
                    background-color: #2563eb;
                }

                /* Icon Colors */
                .icon-blue { color: #3b82f6; }
                .icon-green { color: #10b981; }
                .icon-red { color: #ef4444; }
                .icon-yellow { color: #f59e0b; }
                .icon-purple { color: #8b5cf6; }
                .icon-orange { color: #f97316; }
                .icon-teal { color: #14b8a6; }
                .icon-indigo { color: #6366f1; }
            `}</style>

            <div id="DashboardText-container">
                <div className="title-section">
                    <h1 className="text-title">Setting Area</h1>
                </div>

                <div className="settings-container">
                    {/* Email Settings */}
                    <div className="setting-section">
                        <div className="section-header">
                            <Mail className="section-icon icon-blue" size={24} />
                            <h2 className="section-title">Email Settings</h2>
                        </div>
                        <div className="section-content">
                            <input 
                                type="email" 
                                placeholder="your.email@example.com" 
                                className="email-input"
                            />
                            <button className="update-btn">
                                Update Email
                            </button>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="setting-section">
                        <div className="section-header">
                            <Globe className="section-icon icon-green" size={24} />
                            <h2 className="section-title">Services</h2>
                        </div>
                        <div className="section-content">
                            <div className="services-list">
                                <div className="service-item">
                                    <span>Cloud Sync</span>
                                    <button className="service-status status-active">
                                        Active
                                    </button>
                                </div>
                                <div className="service-item">
                                    <span>Backup Service</span>
                                    <button className="service-status status-inactive">
                                        Inactive
                                    </button>
                                </div>
                                <div className="service-item">
                                    <span>Analytics</span>
                                    <button className="service-status status-active">
                                        Active
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Privacy and Security */}
                    <div className="setting-section">
                        <div className="section-header">
                            <Shield className="section-icon icon-red" size={24} />
                            <h2 className="section-title">Privacy & Security</h2>
                        </div>
                        <div className="section-content">
                            <div className="toggle-container">
                                <span className="toggle-label">Enhanced Privacy Mode</span>
                                <label className="toggle-switch privacy-toggle">
                                    <input 
                                        type="checkbox" 
                                        checked={privacy} 
                                        onChange={togglePrivacy}
                                        className="toggle-input"
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <div className="toggle-container">
                                <span className="toggle-label">Two-Factor Authentication</span>
                                <button className="setup-btn">
                                    Setup
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Theme Toggle */}
                    <div className="setting-section">
                        <div className="section-header">
                            {darkMode ? 
                                <Moon className="section-icon icon-purple" size={24} /> : 
                                <Sun className="section-icon icon-yellow" size={24} />
                            }
                            <h2 className="section-title">Appearance</h2>
                        </div>
                        <div className="section-content">
                            <div className="toggle-container">
                                <span className="toggle-label">Dark Mode</span>
                                <label className="toggle-switch theme-toggle">
                                    <input 
                                        type="checkbox" 
                                        checked={darkMode} 
                                        onChange={toggleDarkMode}
                                        className="toggle-input"
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Password Management */}
                    <div className="setting-section">
                        <div className="section-header">
                            <Key className="section-icon icon-orange" size={24} />
                            <h2 className="section-title">Password Management</h2>
                        </div>
                        <div className="section-content">
                            <div className="password-buttons">
                                <button className="password-btn btn-orange">
                                    Change Password
                                </button>
                                <button className="password-btn btn-gray">
                                    Manage Saved Passwords
                                </button>
                                <button className="password-btn btn-red">
                                    Reset All Sessions
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Language Settings */}
                    <div className="setting-section">
                        <div className="section-header">
                            <Globe className="section-icon icon-teal" size={24} />
                            <h2 className="section-title">Language</h2>
                        </div>
                        <div className="section-content">
                            <select 
                                value={language} 
                                onChange={(e) => setLanguage(e.target.value)}
                                className="language-select"
                            >
                                <option value="English">English</option>
                                <option value="Spanish">Español</option>
                                <option value="French">Français</option>
                                <option value="German">Deutsch</option>
                                <option value="Chinese">中文</option>
                                <option value="Japanese">日本語</option>
                            </select>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="setting-section">
                        <div className="section-header">
                            <Bell className="section-icon icon-indigo" size={24} />
                            <h2 className="section-title">Notifications</h2>
                        </div>
                        <div className="section-content">
                            <div className="toggle-container">
                                <span className="toggle-label">Push Notifications</span>
                                <label className="toggle-switch notification-toggle">
                                    <input 
                                        type="checkbox" 
                                        checked={notifications} 
                                        onChange={toggleNotifications}
                                        className="toggle-input"
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <div className="toggle-container">
                                <span className="toggle-label">Email Notifications</span>
                                <label className="toggle-switch notification-toggle">
                                    <input 
                                        type="checkbox" 
                                        defaultChecked
                                        className="toggle-input"
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <div className="toggle-container">
                                <span className="toggle-label">SMS Notifications</span>
                                <label className="toggle-switch notification-toggle">
                                    <input 
                                        type="checkbox" 
                                        className="toggle-input"
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <button className="save-button">
                        Save All Settings
                    </button>
                </div>
            </div>
        </>
    );
};

export default DashboardSetting;