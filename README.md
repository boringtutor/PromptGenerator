# AI Prompt Generator

AI Prompt Generator is an open-source tool designed to help users create detailed and context-rich prompts for AI models. This project aims to streamline the process of generating high-quality prompts by providing examples, context, and additional details based on a given topic.

## Features

- Input form for entering initial prompt topics
- Generation of examples related to the given topic
- Context generation to provide background information
- Detailed prompt creation combining examples, context, and the original topic
- Responsive UI with error handling and loading states
- Copy to clipboard functionality (coming soon)

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Conform
- Zod
- TanStack Query (React Query)
- clsx
- cva (Class Variance Authority)
- React Toastify

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/boringtutor/PromptGenerator.git
   ```

2. Navigate to the project directory:

   ```
   cd PromptGenerator
   ```

3. Install dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

4. Set up your environment variables:

   Create a `.env.local` file in the root directory and add the following:

   ```
      OPENAI_API_KEY=your_openai_api_key
   ```

   Replace `your_openai_api_key` with your actual OpenAI credentials. You can obtain these from your OpenAI account dashboard.

   Note: Never commit your `.env.local` file to version control. It's already included in the `.gitignore` file.

5. Start the development server:

   ```
   npm run dev
   ```

   or

   ```
   yarn dev
   ```

6. Open your browser and visit `http://localhost:3000`

## Usage

1. Enter a topic or initial prompt in the input field.
2. Click the "Generate Prompt" button.
3. Wait for the AI to generate examples, context, and a detailed prompt.
4. The generated prompt will be displayed in a card format.
5. (Coming soon) Use the copy to clipboard button to easily copy the generated prompt.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all the open-source libraries and tools used in this project.
- Inspired by the need for better AI prompt generation in the community.

## Roadmap

- [x] Add copy to clipboard button
- [x] Implement GitHub Actions for CI/CD pipeline
- [x] Add Docker support
- [ ] Create a dashboard for managing everything
- [ ] Implement a rating system for prompt validation
- [ ] Develop a paid version with additional features (auth, analytics, etc.)

## Contact

Email :[boringtutor@gmail.com](boringtutor@gmail.com)

Project Link: [https://github.com/boringtutor/PromptGenerator](https://github.com/boringtutor/PromptGenerator)
