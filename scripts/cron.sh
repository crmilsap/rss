cd "$(git rev-parse --show-toplevel)"

echo "Building cron-jobs from ./jobs"
docker build -t cron-jobs ./jobs

echo "Running cron-jobs"
docker run -d cron-jobs
