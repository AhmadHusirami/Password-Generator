import { useState, useEffect, SetStateAction } from 'react';
import './App.css';
import { TbWorld } from 'react-icons/tb';
import { GrCopy } from 'react-icons/gr';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18n from 'i18next';

const resources = {
  en: {
    translation: {
      'Password Generator': 'Password Generator',
      'Use this tool to instantly create secure, random passwords.': 'Use this tool to instantly create secure, random passwords.',
      'Password Length': 'Password Length',
      'Lowercase': 'Lowercase',
      'Uppercase': 'Uppercase',
      'Numbers': 'Numbers',
      'Symbols': 'Symbols',
      'Generate Password': 'Generate Password',
      'Please select at least one option for generating password!': 'Please select at least one option for generating password!',
      'Password copied to clipboard!': 'Password copied to clipboard!',
    }
  },
  ar: {
    translation: {
      'Password Generator': 'مولد كلمات المرور',
      'Use this tool to instantly create secure, random passwords.': 'استخدم هذه الأداة لإنشاء كلمات مرور آمنة وعشوائية فورية.',
      'Password Length': 'طول كلمة المرور',
      'Lowercase': 'أحرف صغيرة',
      'Uppercase': 'أحرف كبيرة',
      'Numbers': 'أرقام',
      'Symbols': 'رموز',
      'Generate Password': 'إنشاء كلمة مرور',
      'Please select at least one option for generating password!': 'يرجى اختيار خيار واحد على الأقل لإنشاء كلمة مرور!',
      'Password copied to clipboard!': 'تم نسخ كلمة المرور إلى الحافظة!',
    }
  }
};

i18n.init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false
  }
});

function App() {
  const [password, setPassword] = useState('');
  const [lowercaseChecked, setLowercaseChecked] = useState(true);
  const [uppercaseChecked, setUppercaseChecked] = useState(true);
  const [numbersChecked, setNumbersChecked] = useState(true);
  const [symbolsChecked, setSymbolsChecked] = useState(true);
  const [rangeValue, setRangeValue] = useState(16);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    generatePassword();
  }, []);

  const generatePassword = () => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charset = '';
    if (lowercaseChecked) charset += lowercaseChars;
    if (uppercaseChecked) charset += uppercaseChars;
    if (numbersChecked) charset += numberChars;
    if (symbolsChecked) charset += symbolChars;

    if (charset === '') {
      toast.error(i18n.t('Please select at least one option for generating password!'));
      return;
    }

    let newPassword = '';
    for (let i = 0; i < rangeValue; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success(i18n.t('Password copied to clipboard!'), { position: 'bottom-center' });
  };

  const handleRangeChange = (e: { target: { value: string; }; }) => {
    const value = parseInt(e.target.value);
    setRangeValue(value);
  };

  const getLineColor = () => {
    let color = '';
    let width = '100%';

    if (rangeValue >= 6 && rangeValue <= 9) {
      color = '#d70606';
      width = '25%';
    } else if (rangeValue >= 10 && rangeValue <= 21) {
      color = '#d79c06';
      width = '33.33%';
    } else if (rangeValue >= 22 && rangeValue <= 39) {
      color = '#0ee03c';
      width = '50%';
    } else if (rangeValue >= 40 && rangeValue <= 100) {
      color = '#059725';
    }

    return { color, width };
  };

  const { color, width } = getLineColor();

  const handleLanguageChange = (language: SetStateAction<string> | undefined) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <div className='icon'>
        <TbWorld />
        <div className='dropdown'>
          <button className='dropbtn' onClick={toggleDropdown}>
            {selectedLanguage === 'en' ? 'English' : 'عربي'}
          </button>
          {dropdownOpen && (
            <div className='dropdown-content'>
              <button onClick={() => handleLanguageChange('en')}>English</button>
              <div className='dropdown_border'></div>
              <button onClick={() => handleLanguageChange('ar')}>عربي</button>
            </div>
          )}
        </div>
      </div>

      <div className='texts'>
        <p className='text-1'>{i18n.t('Password Generator')}</p>
        <p className='text-2'>{i18n.t('Use this tool to instantly create secure, random passwords.')}</p>
      </div>

      <div className='generated-container'>
        <div className='generated-number'>{password}</div>
        <GrCopy className='copy-icon' onClick={copyToClipboard} />
        <div className='color-line' style={{ backgroundColor: color, width }}></div>
      </div>

      <div>
        <div className='password-head'>{i18n.t('Password Length')}</div>
      </div>

      <div className='range-container'>
        <input
          type="range"
          min="6"
          max="100"
          value={rangeValue}
          onChange={handleRangeChange}
          className='range-input'
        />

        <div>
          <div className='range-value'>{rangeValue}</div>
        </div>

        <div className='options'>
          <div>
            <label className='checkbox-label'>
              <input type='checkbox' checked={lowercaseChecked} onChange={() => setLowercaseChecked(!lowercaseChecked)} />
              {i18n.t('Lowercase')}
            </label>
            <label className='checkbox-label'>
              <input type='checkbox' checked={uppercaseChecked} onChange={() => setUppercaseChecked(!uppercaseChecked)} />
              {i18n.t('Uppercase')}
            </label>
          </div>
          <div className="right-options">
            <label className='checkbox-label'>
              <input type='checkbox' checked={numbersChecked} onChange={() => setNumbersChecked(!numbersChecked)} />
              {i18n.t('Numbers')}
            </label>
            <label className='checkbox-label'>
              <input type='checkbox' checked={symbolsChecked} onChange={() => setSymbolsChecked(!symbolsChecked)} />
              {i18n.t('Symbols')}
            </label>
          </div>
        </div>
      </div>

      <button className='generate-button' onClick={generatePassword}>{i18n.t('Generate Password')}</button>

      <ToastContainer />

      <div>
        <div className='faq_title'><h2>Frequently Asked Questions</h2></div>

        <div>
          <div className='faq_title_1'><h3>What is a password generator?</h3></div>
          <div className='answer_1'>A password generator is a web tool that creates unique and random passwords based on security recommendations. The best password generators are the ones that allow you to customize settings according to your requirements. Our tool has plenty of options for the best result.</div>
          <div className='border'></div>

          <div className='faq_title_2'><h3>Is this generator safe to use?</h3></div>
          <div className='answer_2'>Passwords generated are not stored or shared anywhere else since they are created locally on your computer. Remember not to leave the page unattended to once you're done creating and copying your password.</div>
          <div className='border'></div>

          <div className='faq_title_3'><h3>What are the requirements for a strong password?</h3></div>
          <div className='answer_3'>A <span className='red_text'>strong password</span> is one that is hard to crack. It needs to be as random as possible and have more than eight characters. Also, it must include a combination of upper and lower cases or be a mixture of symbols and a passphrase.</div>
          <div className='border'></div>

          <div className='faq_title_4'><h3>What passwords should not be used?</h3></div>
          <div className='answer_4'>Passwords that you’ve used before, Passwords that are the same as your username, Anything that includes personal information, Words from a dictionary, Common phrases, Popular passwords like password, 123456, qwerty, abc123, iloveyou, 111111, and so on, Anything shorter than 12 characters.</div>
          <div className='border'></div>

          <div className='faq_title_5'><h3>How long should my password be?</h3></div>
          <div className='answer_5'>Your passwords should be at least 12 characters long. However, the longer the password is, the better.</div>
          <div className='border'></div>

          <div className='faq_title_6'><h3>Do I need a unique password for every account?</h3></div>
          <div className='answer_6'>Yes! Using the same password across multiple accounts is a huge no-no. If hackers learn the password to one of your accounts, they’ll have your password for all the others, too.</div>
          <div className='border'></div>

          <div className='faq_title_7'><h3>Can a strong password be hacked?</h3></div>
          <div className='answer_7'>Creating completely uncrackable passwords is becoming a challenge. But you can stand a better chance against hackers by avoiding bad password practices. They include reusing passwords for different accounts, common keyword patterns (such as qwerty), common acronyms (such as ymca), or repeating characters (such as zzz111). Stay on track with your passwords by using our online password generator and password strength checker tools.</div>
          <div className='border'></div>

          <div className='extended_section'></div>
        </div>
      </div>

      <footer className='footer'>
        <p>© <span id="year"></span> <a className='footer_url' href="https://ahmad-husirami.vercel.app/">Ahmad Husirami.</a> All rights reserved.</p>
        <script>
          document.getElementById('year').textContent = new Date().getFullYear();
        </script>
      </footer>
    </div>
  );
}

export default App;
